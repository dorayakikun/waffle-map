import * as fc from "fast-check";
import { round } from "../roundPoint";

describe("round property-based tests", () => {
  const validPlace = fc.integer({ min: 1, max: 6 });
  // Use a smaller range to avoid floating point precision issues with very large numbers
  const finiteNumber = fc.double({
    noNaN: true,
    noDefaultInfinity: true,
    min: -1e6,
    max: 1e6,
  });

  describe("Monotonicity", () => {
    test("preserves ordering: a <= b => round(a, p) <= round(b, p)", () => {
      fc.assert(
        fc.property(finiteNumber, finiteNumber, validPlace, (a, b, place) => {
          const [min, max] = a <= b ? [a, b] : [b, a];
          return round(min, place) <= round(max, place);
        }),
        { numRuns: 2000 },
      );
    });
  });

  describe("Ceiling behavior", () => {
    test("result is always >= input (ceiling rounds up)", () => {
      fc.assert(
        fc.property(finiteNumber, validPlace, (n, place) => {
          return round(n, place) >= n;
        }),
        { numRuns: 2000 },
      );
    });
  });

  describe("Idempotency", () => {
    test("round(round(n, p), p) approximately equals round(n, p)", () => {
      fc.assert(
        fc.property(finiteNumber, validPlace, (n, place) => {
          const once = round(n, place);
          const twice = round(once, place);
          // Use epsilon comparison due to floating point precision
          const epsilon = 1 / 10 ** place;
          return Math.abs(once - twice) < epsilon;
        }),
        { numRuns: 2000 },
      );
    });
  });

  describe("Precision bound", () => {
    test("result has at most 'place' decimal digits", () => {
      fc.assert(
        fc.property(finiteNumber, validPlace, (n, place) => {
          const result = round(n, place);
          const ep = 10 ** place;
          const scaled = result * ep;
          // Check if scaled result is very close to an integer
          return Math.abs(scaled - Math.round(scaled)) < 1e-6;
        }),
        { numRuns: 1000 },
      );
    });
  });

  describe("Error handling", () => {
    test("throws for place < 1", () => {
      fc.assert(
        fc.property(
          finiteNumber,
          fc.integer({ min: -100, max: 0 }),
          (n, invalidPlace) => {
            try {
              round(n, invalidPlace);
              return false; // Should have thrown
            } catch (e) {
              return e instanceof Error;
            }
          },
        ),
      );
    });
  });
});

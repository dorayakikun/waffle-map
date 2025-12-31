import { round } from "../roundPoint";

test("Should throw an error when place less than 1", () => {
  expect(() => round(1.2345, 0)).toThrow(`Invalid place found.
The acceptable place is greater than 0.`);
});

test("Should round up to specified decimal places", () => {
  expect(round(1.234, 2)).toBe(1.24);
  expect(round(1.001, 2)).toBe(1.01);
  expect(round(1.999, 2)).toBe(2);
});

test("Should handle different place values", () => {
  expect(round(1.23456, 1)).toBe(1.3);
  expect(round(1.23456, 3)).toBe(1.235);
  expect(round(1.23456, 4)).toBe(1.2346);
});

test("Should handle zero value", () => {
  expect(round(0, 2)).toBe(0);
});

test("Should handle negative numbers", () => {
  expect(round(-1.234, 2)).toBe(-1.23);
  expect(round(-1.999, 2)).toBe(-1.99);
});

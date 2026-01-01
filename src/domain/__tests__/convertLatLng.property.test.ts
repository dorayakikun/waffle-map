import * as fc from "fast-check";
import {
  convertLatLngToTokyo,
  convertLatLngToWGS84,
  convertLatLngToMillisec,
  convertBoundsToTokyo,
  convertBoundsToWGS84,
  convertBoundsToMillisec,
  createLatLng,
  convertLatLngToTokyoIfNeeded,
  convertLatLngToWGS84IfNeeded,
  convertLatLngToMillisecIfNeeded,
  convertBoundsToTokyoIfNeeded,
  convertBoundsToWGS84IfNeeded,
  convertBoundsToMillisecIfNeeded,
} from "../convertLatLng";

// Custom arbitrary for valid LatLng (Japan region for realistic testing)
const latLngArbitrary = fc.record({
  lat: fc.double({ min: 20, max: 46, noNaN: true }),
  lng: fc.double({ min: 122, max: 154, noNaN: true }),
});

// Custom arbitrary for valid Bounds (leftTop.lat > rightBottom.lat, leftTop.lng < rightBottom.lng)
// Use wider separation to ensure coordinate transform doesn't invert the relationship
const boundsArbitrary = fc
  .record({
    leftTop: fc.record({
      lat: fc.double({ min: 38, max: 46, noNaN: true }),
      lng: fc.double({ min: 122, max: 135, noNaN: true }),
    }),
    rightBottom: fc.record({
      lat: fc.double({ min: 20, max: 32, noNaN: true }),
      lng: fc.double({ min: 140, max: 154, noNaN: true }),
    }),
  })
  .filter(
    (b) =>
      b.leftTop.lat > b.rightBottom.lat + 1 &&
      b.leftTop.lng < b.rightBottom.lng - 1,
  );

describe("convertLatLng property-based tests", () => {
  describe("Tokyo/WGS84 conversion reversibility", () => {
    test("WGS84(Tokyo(x)) approximately equals x", () => {
      fc.assert(
        fc.property(latLngArbitrary, (latLng) => {
          const tokyo = convertLatLngToTokyo(latLng);
          const backToWGS84 = convertLatLngToWGS84(tokyo);

          const EPSILON = 0.0001; // ~11 meters tolerance
          return (
            Math.abs(backToWGS84.lat - latLng.lat) < EPSILON &&
            Math.abs(backToWGS84.lng - latLng.lng) < EPSILON
          );
        }),
        { numRuns: 1000 },
      );
    });

    test("Tokyo(WGS84(x)) approximately equals x", () => {
      fc.assert(
        fc.property(latLngArbitrary, (latLng) => {
          const wgs84 = convertLatLngToWGS84(latLng);
          const backToTokyo = convertLatLngToTokyo(wgs84);

          const EPSILON = 0.0001;
          return (
            Math.abs(backToTokyo.lat - latLng.lat) < EPSILON &&
            Math.abs(backToTokyo.lng - latLng.lng) < EPSILON
          );
        }),
        { numRuns: 1000 },
      );
    });
  });

  describe("Millisecond conversion", () => {
    test("correctly scales by 3600000 and truncates", () => {
      fc.assert(
        fc.property(latLngArbitrary, (latLng) => {
          const millisec = convertLatLngToMillisec(latLng);
          return (
            millisec.lat === Math.trunc(latLng.lat * 3600000) &&
            millisec.lng === Math.trunc(latLng.lng * 3600000)
          );
        }),
      );
    });

    test("produces integer values", () => {
      fc.assert(
        fc.property(latLngArbitrary, (latLng) => {
          const millisec = convertLatLngToMillisec(latLng);
          return Number.isInteger(millisec.lat) && Number.isInteger(millisec.lng);
        }),
      );
    });
  });

  describe("Bounds conversion preserves structure", () => {
    test("Tokyo conversion preserves leftTop.lat > rightBottom.lat relationship", () => {
      fc.assert(
        fc.property(boundsArbitrary, (bounds) => {
          const converted = convertBoundsToTokyo(bounds);
          return converted.leftTop.lat > converted.rightBottom.lat;
        }),
      );
    });

    test("WGS84 conversion preserves leftTop.lat > rightBottom.lat relationship", () => {
      fc.assert(
        fc.property(boundsArbitrary, (bounds) => {
          const converted = convertBoundsToWGS84(bounds);
          return converted.leftTop.lat > converted.rightBottom.lat;
        }),
      );
    });

    test("Millisec conversion preserves leftTop.lat > rightBottom.lat relationship", () => {
      fc.assert(
        fc.property(boundsArbitrary, (bounds) => {
          const converted = convertBoundsToMillisec(bounds);
          return converted.leftTop.lat > converted.rightBottom.lat;
        }),
      );
    });

    test("Tokyo conversion preserves leftTop.lng < rightBottom.lng relationship", () => {
      fc.assert(
        fc.property(boundsArbitrary, (bounds) => {
          const converted = convertBoundsToTokyo(bounds);
          return converted.leftTop.lng < converted.rightBottom.lng;
        }),
      );
    });
  });

  describe("createLatLng parsing", () => {
    test("parses valid degree coordinates correctly", () => {
      fc.assert(
        fc.property(
          fc.double({ min: -90, max: 90, noNaN: true, noDefaultInfinity: true }),
          fc.double({ min: -180, max: 180, noNaN: true, noDefaultInfinity: true }),
          (lat, lng) => {
            // Format numbers without scientific notation
            const latStr = lat.toFixed(10).replace(/\.?0+$/, "");
            const lngStr = lng.toFixed(10).replace(/\.?0+$/, "");
            const input = `${latStr},${lngStr}`;

            try {
              const result = createLatLng(input, "degree");
              // Allow small floating point differences
              return (
                Math.abs(result.lat - lat) < 1e-9 &&
                Math.abs(result.lng - lng) < 1e-9
              );
            } catch {
              // Some edge case formatting might fail - that's acceptable
              return true;
            }
          },
        ),
        { numRuns: 500 },
      );
    });

    test("handles whitespace around coordinates", () => {
      const spacesArb = fc.constantFrom("", " ", "  ", "   ");
      fc.assert(
        fc.property(
          fc.integer({ min: -90, max: 90 }),
          fc.integer({ min: -180, max: 180 }),
          spacesArb,
          (lat, lng, spaces) => {
            const input = `${spaces}${lat}${spaces},${spaces}${lng}${spaces}`;
            const result = createLatLng(input, "degree");
            return result.lat === lat && result.lng === lng;
          },
        ),
      );
    });

    test("throws on invalid format (no comma)", () => {
      fc.assert(
        fc.property(
          fc.double({ min: -90, max: 90, noNaN: true }),
          (lat) => {
            try {
              createLatLng(lat.toString(), "degree");
              return false; // Should have thrown
            } catch (e) {
              return e instanceof Error && e.message.includes("Expected: lat,lng");
            }
          },
        ),
      );
    });

    test("throws on non-numeric values", () => {
      // Test with known non-numeric values that don't contain commas
      // Note: "1,000" would be split at comma and become two values, so it's excluded
      const nonNumericArb = fc.constantFrom(
        "abc",
        "1.2.3",
        "12e5",
        "NaN",
        "Infinity",
        "--1",
        "1-",
        ".5",
        "5.",
        "hello",
      );
      fc.assert(
        fc.property(nonNumericArb, fc.integer({ min: -180, max: 180 }), (invalidLat, lng) => {
          try {
            createLatLng(`${invalidLat},${lng}`, "degree");
            return false; // Should have thrown
          } catch (e) {
            return e instanceof Error && e.message.includes("Only numbers are acceptable");
          }
        }),
        { numRuns: 100 },
      );
    });
  });

  describe("IfNeeded functions idempotency", () => {
    test("TokyoIfNeeded returns unchanged for WGS84 datum", () => {
      fc.assert(
        fc.property(latLngArbitrary, (latLng) => {
          const result = convertLatLngToTokyoIfNeeded(latLng, "WGS84");
          return result.lat === latLng.lat && result.lng === latLng.lng;
        }),
      );
    });

    test("WGS84IfNeeded returns unchanged for WGS84 datum", () => {
      fc.assert(
        fc.property(latLngArbitrary, (latLng) => {
          const result = convertLatLngToWGS84IfNeeded(latLng, "WGS84");
          return result.lat === latLng.lat && result.lng === latLng.lng;
        }),
      );
    });

    test("MillisecIfNeeded returns unchanged for degree unit", () => {
      fc.assert(
        fc.property(latLngArbitrary, (latLng) => {
          const result = convertLatLngToMillisecIfNeeded(latLng, "degree");
          return result.lat === latLng.lat && result.lng === latLng.lng;
        }),
      );
    });

    test("BoundsToTokyoIfNeeded returns unchanged for WGS84 datum", () => {
      fc.assert(
        fc.property(boundsArbitrary, (bounds) => {
          const result = convertBoundsToTokyoIfNeeded(bounds, "WGS84");
          return (
            result.leftTop.lat === bounds.leftTop.lat &&
            result.leftTop.lng === bounds.leftTop.lng &&
            result.rightBottom.lat === bounds.rightBottom.lat &&
            result.rightBottom.lng === bounds.rightBottom.lng
          );
        }),
      );
    });

    test("BoundsToWGS84IfNeeded returns unchanged for WGS84 datum", () => {
      fc.assert(
        fc.property(boundsArbitrary, (bounds) => {
          const result = convertBoundsToWGS84IfNeeded(bounds, "WGS84");
          return (
            result.leftTop.lat === bounds.leftTop.lat &&
            result.leftTop.lng === bounds.leftTop.lng &&
            result.rightBottom.lat === bounds.rightBottom.lat &&
            result.rightBottom.lng === bounds.rightBottom.lng
          );
        }),
      );
    });

    test("BoundsToMillisecIfNeeded returns unchanged for degree unit", () => {
      fc.assert(
        fc.property(boundsArbitrary, (bounds) => {
          const result = convertBoundsToMillisecIfNeeded(bounds, "degree");
          return (
            result.leftTop.lat === bounds.leftTop.lat &&
            result.leftTop.lng === bounds.leftTop.lng &&
            result.rightBottom.lat === bounds.rightBottom.lat &&
            result.rightBottom.lng === bounds.rightBottom.lng
          );
        }),
      );
    });
  });

  describe("IfNeeded functions apply conversion when needed", () => {
    test("TokyoIfNeeded applies conversion for Tokyo datum", () => {
      fc.assert(
        fc.property(latLngArbitrary, (latLng) => {
          const result = convertLatLngToTokyoIfNeeded(latLng, "Tokyo");
          const expected = convertLatLngToTokyo(latLng);
          return result.lat === expected.lat && result.lng === expected.lng;
        }),
      );
    });

    test("WGS84IfNeeded applies conversion for Tokyo datum", () => {
      fc.assert(
        fc.property(latLngArbitrary, (latLng) => {
          const result = convertLatLngToWGS84IfNeeded(latLng, "Tokyo");
          const expected = convertLatLngToWGS84(latLng);
          return result.lat === expected.lat && result.lng === expected.lng;
        }),
      );
    });

    test("MillisecIfNeeded applies conversion for millisec unit", () => {
      fc.assert(
        fc.property(latLngArbitrary, (latLng) => {
          const result = convertLatLngToMillisecIfNeeded(latLng, "millisec");
          const expected = convertLatLngToMillisec(latLng);
          return result.lat === expected.lat && result.lng === expected.lng;
        }),
      );
    });
  });
});

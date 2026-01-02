import fc from "fast-check";
import {
  generateMeshcodesUrl,
  parseMeshcodesFromUrl,
} from "../meshcodeUrl";

describe("meshcodeUrl property-based tests", () => {
  // Arbitrary for meshcode-like strings (e.g., "5339-35-97")
  const meshcodeArb = fc
    .tuple(
      fc.integer({ min: 1000, max: 9999 }),
      fc.integer({ min: 10, max: 99 }),
      fc.integer({ min: 10, max: 99 }),
    )
    .map(([a, b, c]) => `${a}-${b}-${c}`);

  const separatorArb = fc.constantFrom(",", ".");

  describe("reversibility", () => {
    test("generate → parse restores original meshcodes (multiple meshcodes)", () => {
      fc.assert(
        fc.property(
          // Use minLength: 2 because single meshcode URLs don't contain separator
          fc.array(meshcodeArb, { minLength: 2, maxLength: 10 }),
          separatorArb,
          (meshcodes, separator) => {
            const url = generateMeshcodesUrl(meshcodes, separator);
            const result = parseMeshcodesFromUrl(url);

            return (
              JSON.stringify(result.meshcodes) === JSON.stringify(meshcodes) &&
              result.separator === separator
            );
          },
        ),
        { numRuns: 500 },
      );
    });

    test("single meshcode roundtrip preserves meshcode value", () => {
      fc.assert(
        fc.property(meshcodeArb, separatorArb, (meshcode, separator) => {
          const url = generateMeshcodesUrl([meshcode], separator);
          const result = parseMeshcodesFromUrl(url);

          // For single meshcode, we only check the meshcode value is preserved
          // Separator cannot be determined from single meshcode URL
          return (
            result.meshcodes.length === 1 && result.meshcodes[0] === meshcode
          );
        }),
        { numRuns: 200 },
      );
    });
  });

  describe("separator detection", () => {
    test("comma URLs are detected as comma-separated", () => {
      fc.assert(
        fc.property(
          fc.array(meshcodeArb, { minLength: 2, maxLength: 5 }),
          (meshcodes) => {
            const url = `/${meshcodes.join(",")}/`;
            return parseMeshcodesFromUrl(url).separator === ",";
          },
        ),
        { numRuns: 200 },
      );
    });

    test("dot URLs are detected as dot-separated", () => {
      fc.assert(
        fc.property(
          fc.array(meshcodeArb, { minLength: 2, maxLength: 5 }),
          (meshcodes) => {
            const url = `/${meshcodes.join(".")}/`;
            return parseMeshcodesFromUrl(url).separator === ".";
          },
        ),
        { numRuns: 200 },
      );
    });
  });

  describe("URL structure", () => {
    test("generated URLs always start and end with slash", () => {
      fc.assert(
        fc.property(
          fc.array(meshcodeArb, { minLength: 1, maxLength: 5 }),
          separatorArb,
          (meshcodes, separator) => {
            const url = generateMeshcodesUrl(meshcodes, separator);
            return url.startsWith("/") && url.endsWith("/");
          },
        ),
        { numRuns: 200 },
      );
    });

    test("generated URL length is proportional to meshcode count", () => {
      fc.assert(
        fc.property(
          fc.array(meshcodeArb, { minLength: 1, maxLength: 10 }),
          separatorArb,
          (meshcodes, separator) => {
            const url = generateMeshcodesUrl(meshcodes, separator);
            // URL should contain all meshcodes joined by separator plus slashes
            const expectedLength =
              2 + meshcodes.join(separator).length;
            return url.length === expectedLength;
          },
        ),
        { numRuns: 200 },
      );
    });
  });

  describe("meshcode preservation", () => {
    test("meshcode order is preserved", () => {
      fc.assert(
        fc.property(
          fc.array(meshcodeArb, { minLength: 2, maxLength: 10 }),
          separatorArb,
          (meshcodes, separator) => {
            const url = generateMeshcodesUrl(meshcodes, separator);
            const result = parseMeshcodesFromUrl(url);

            for (let i = 0; i < meshcodes.length; i++) {
              if (meshcodes[i] !== result.meshcodes[i]) {
                return false;
              }
            }
            return true;
          },
        ),
        { numRuns: 300 },
      );
    });

    test("meshcode count is preserved", () => {
      fc.assert(
        fc.property(
          fc.array(meshcodeArb, { minLength: 1, maxLength: 10 }),
          separatorArb,
          (meshcodes, separator) => {
            const url = generateMeshcodesUrl(meshcodes, separator);
            const result = parseMeshcodesFromUrl(url);

            return result.meshcodes.length === meshcodes.length;
          },
        ),
        { numRuns: 300 },
      );
    });
  });

  describe("empty input handling", () => {
    test("empty array always produces root URL", () => {
      fc.assert(
        fc.property(separatorArb, (separator) => {
          return generateMeshcodesUrl([], separator) === "/";
        }),
        { numRuns: 10 },
      );
    });

    test("root URL always produces empty meshcodes", () => {
      const result = parseMeshcodesFromUrl("/");
      return result.meshcodes.length === 0;
    });
  });
});

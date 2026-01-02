import {
  generateMeshcodesUrl,
  parseMeshcodesFromUrl,
} from "../meshcodeUrl";

describe("parseMeshcodesFromUrl", () => {
  describe("basic parsing", () => {
    test("parses comma-separated meshcodes", () => {
      const result = parseMeshcodesFromUrl("/5339-35-97,5339-35-98/");
      expect(result.meshcodes).toEqual(["5339-35-97", "5339-35-98"]);
      expect(result.separator).toBe(",");
    });

    test("parses dot-separated meshcodes", () => {
      const result = parseMeshcodesFromUrl("/5339-35-97.5339-35-98/");
      expect(result.meshcodes).toEqual(["5339-35-97", "5339-35-98"]);
      expect(result.separator).toBe(".");
    });

    test("parses single meshcode", () => {
      const result = parseMeshcodesFromUrl("/5339-35-97/");
      expect(result.meshcodes).toEqual(["5339-35-97"]);
      expect(result.separator).toBe(".");
    });

    test("parses multiple meshcodes with comma", () => {
      const result = parseMeshcodesFromUrl(
        "/5339-35-97,5339-35-98,5339-35-99/",
      );
      expect(result.meshcodes).toEqual([
        "5339-35-97",
        "5339-35-98",
        "5339-35-99",
      ]);
      expect(result.separator).toBe(",");
    });

    test("parses multiple meshcodes with dot", () => {
      const result = parseMeshcodesFromUrl(
        "/5339-35-97.5339-35-98.5339-35-99/",
      );
      expect(result.meshcodes).toEqual([
        "5339-35-97",
        "5339-35-98",
        "5339-35-99",
      ]);
      expect(result.separator).toBe(".");
    });
  });

  describe("edge cases", () => {
    test("returns empty array for root path", () => {
      const result = parseMeshcodesFromUrl("/");
      expect(result.meshcodes).toEqual([]);
      expect(result.separator).toBe(".");
    });

    test("returns empty array for empty string", () => {
      const result = parseMeshcodesFromUrl("");
      expect(result.meshcodes).toEqual([]);
      expect(result.separator).toBe(".");
    });

    test("parses path without trailing slash", () => {
      const result = parseMeshcodesFromUrl("/5339-35-97");
      expect(result.meshcodes).toEqual(["5339-35-97"]);
    });

    test("returns empty array for multiple path segments", () => {
      const result = parseMeshcodesFromUrl("/foo/bar/");
      expect(result.meshcodes).toEqual([]);
    });

    test("returns empty array for deep nested paths", () => {
      const result = parseMeshcodesFromUrl("/foo/bar/baz/");
      expect(result.meshcodes).toEqual([]);
    });

    test("trims whitespace from meshcodes", () => {
      const result = parseMeshcodesFromUrl("/ 5339-35-97 , 5339-35-98 /");
      expect(result.meshcodes).toEqual(["5339-35-97", "5339-35-98"]);
    });

    test("filters out empty meshcodes", () => {
      const result = parseMeshcodesFromUrl("/5339-35-97,,5339-35-98/");
      expect(result.meshcodes).toEqual(["5339-35-97", "5339-35-98"]);
    });
  });

  describe("separator detection", () => {
    test("comma takes precedence if both comma and dot present", () => {
      // This is an unusual case, but comma should take precedence
      const result = parseMeshcodesFromUrl("/5339-35-97,5339.35.98/");
      expect(result.separator).toBe(",");
    });

    test("defaults to dot separator for single meshcode", () => {
      const result = parseMeshcodesFromUrl("/5339-35-97/");
      expect(result.separator).toBe(".");
    });
  });
});

describe("generateMeshcodesUrl", () => {
  test("generates URL with comma separator", () => {
    expect(generateMeshcodesUrl(["5339-35-97", "5339-35-98"], ",")).toBe(
      "/5339-35-97,5339-35-98/",
    );
  });

  test("generates URL with dot separator", () => {
    expect(generateMeshcodesUrl(["5339-35-97", "5339-35-98"], ".")).toBe(
      "/5339-35-97.5339-35-98/",
    );
  });

  test("generates URL for single meshcode", () => {
    expect(generateMeshcodesUrl(["5339-35-97"], ",")).toBe("/5339-35-97/");
  });

  test("returns root for empty array", () => {
    expect(generateMeshcodesUrl([], ",")).toBe("/");
    expect(generateMeshcodesUrl([], ".")).toBe("/");
  });

  test("generates URL for multiple meshcodes", () => {
    expect(
      generateMeshcodesUrl(["5339-35-97", "5339-35-98", "5339-35-99"], ","),
    ).toBe("/5339-35-97,5339-35-98,5339-35-99/");
  });
});

describe("roundtrip", () => {
  test("parse and generate are inverse operations with comma", () => {
    const original = ["5339-35-97", "5339-35-98"];
    const separator = ",";
    const url = generateMeshcodesUrl(original, separator);
    const result = parseMeshcodesFromUrl(url);

    expect(result.meshcodes).toEqual(original);
    expect(result.separator).toBe(separator);
  });

  test("parse and generate are inverse operations with dot", () => {
    const original = ["5339-35-97", "5339-35-98"];
    const separator = ".";
    const url = generateMeshcodesUrl(original, separator);
    const result = parseMeshcodesFromUrl(url);

    expect(result.meshcodes).toEqual(original);
    expect(result.separator).toBe(separator);
  });
});

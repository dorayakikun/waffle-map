import {
  ERROR_MESSAGES,
  formatAppError,
  formatLatLngError,
  formatMeshcodeError,
  getDefaultMessage,
} from "../messages";
import type { AppError, ErrorCode } from "../types";

describe("error messages", () => {
  describe("ERROR_MESSAGES and getDefaultMessage", () => {
    const cases: [ErrorCode, string][] = [
      ["MESHCODE_INVALID", "The mesh code format is invalid. Please check the format."],
      ["MESHCODE_PARSE_FAILED", "Could not parse the mesh codes. Please check the separator."],
      ["LATLNG_INVALID", "The coordinates are outside the valid range."],
      ["LATLNG_PARSE_FAILED", "Could not parse the coordinates. Use format: latitude,longitude"],
      ["LATLNG_FORMAT_ERROR", "The coordinate format is invalid."],
      [
        "MESH_CALCULATOR_NOT_INITIALIZED",
        "The mesh calculator is still loading. Please wait a moment.",
      ],
      [
        "MESH_CALCULATOR_LOAD_FAILED",
        "Failed to load the mesh calculator. Please refresh the page.",
      ],
      ["CLIPBOARD_ERROR", "Failed to copy to clipboard. Please try again."],
      ["UNKNOWN_ERROR", "An unexpected error occurred. Please try again."],
    ];

    test.each(cases)("returns exact default message for %s", (code, expected) => {
      expect(ERROR_MESSAGES[code]).toBe(expected);
      expect(getDefaultMessage(code)).toBe(expected);
    });
  });

  describe("formatMeshcodeError", () => {
    test("formats MESHCODE_INVALID", () => {
      expect(
        formatMeshcodeError({
          code: "MESHCODE_INVALID",
          meshcode: "invalid",
          reason: "wrong length",
        }),
      ).toBe('Invalid mesh code "invalid": wrong length');
    });

    test("formats MESHCODE_PARSE_FAILED", () => {
      expect(
        formatMeshcodeError({
          code: "MESHCODE_PARSE_FAILED",
          input: "abc,def",
          separator: ",",
        }),
      ).toBe('Could not parse "abc,def" using separator ","');
    });
  });

  describe("formatLatLngError", () => {
    test("formats LATLNG_INVALID for lat", () => {
      expect(
        formatLatLngError({
          code: "LATLNG_INVALID",
          field: "lat",
          value: 95,
          reason: "out of bounds",
        }),
      ).toBe("Invalid latitude: 95 is out of range");
    });

    test("formats LATLNG_INVALID for lng", () => {
      expect(
        formatLatLngError({
          code: "LATLNG_INVALID",
          field: "lng",
          value: 200,
          reason: "out of bounds",
        }),
      ).toBe("Invalid longitude: 200 is out of range");
    });

    test("formats LATLNG_PARSE_FAILED", () => {
      expect(
        formatLatLngError({
          code: "LATLNG_PARSE_FAILED",
          input: "",
          reason: "Empty input",
        }),
      ).toBe("Could not parse coordinates: Empty input");
    });

    test("formats LATLNG_FORMAT_ERROR", () => {
      expect(
        formatLatLngError({
          code: "LATLNG_FORMAT_ERROR",
          field: "lat",
          value: "abc",
          expectedFormat: "number",
        }),
      ).toBe('Invalid format for lat: expected number, got "abc"');
    });
  });

  describe("formatAppError", () => {
    test("returns error.message when present", () => {
      const error: AppError = {
        code: "CLIPBOARD_ERROR",
        message: "Custom clipboard failure",
      };
      expect(formatAppError(error)).toBe("Custom clipboard failure");
    });

    test("falls back to ERROR_MESSAGES[code] when message is empty", () => {
      const error: AppError = {
        code: "CLIPBOARD_ERROR",
        message: "",
      };
      expect(formatAppError(error)).toBe(ERROR_MESSAGES.CLIPBOARD_ERROR);
    });

    test("falls back to UNKNOWN_ERROR when both message and code mapping are missing", () => {
      const error = {
        code: "NON_EXISTENT_CODE" as ErrorCode,
        message: "",
      };
      expect(formatAppError(error)).toBe(ERROR_MESSAGES.UNKNOWN_ERROR);
    });
  });
});

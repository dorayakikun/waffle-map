/**
 * Error type definitions for the application.
 * Uses discriminated unions for type-safe error handling.
 */

export type ErrorCode =
  | "MESHCODE_INVALID"
  | "MESHCODE_PARSE_FAILED"
  | "LATLNG_INVALID"
  | "LATLNG_PARSE_FAILED"
  | "LATLNG_FORMAT_ERROR"
  | "MESH_CALCULATOR_NOT_INITIALIZED"
  | "MESH_CALCULATOR_LOAD_FAILED"
  | "CLIPBOARD_ERROR"
  | "UNKNOWN_ERROR";

/**
 * Base application error type with structured information.
 */
export type AppError = {
  readonly code: ErrorCode;
  readonly message: string;
  readonly details?: Record<string, unknown>;
  readonly cause?: Error;
};

/**
 * Meshcode-specific error types.
 */
export type MeshcodeError =
  | {
      readonly code: "MESHCODE_INVALID";
      readonly meshcode: string;
      readonly reason: string;
    }
  | {
      readonly code: "MESHCODE_PARSE_FAILED";
      readonly input: string;
      readonly separator: string;
    };

/**
 * LatLng-specific error types.
 */
export type LatLngError =
  | {
      readonly code: "LATLNG_INVALID";
      readonly field: "lat" | "lng";
      readonly value: number;
      readonly reason: string;
    }
  | {
      readonly code: "LATLNG_PARSE_FAILED";
      readonly input: string;
      readonly reason: string;
    }
  | {
      readonly code: "LATLNG_FORMAT_ERROR";
      readonly field: string;
      readonly value: string;
      readonly expectedFormat: string;
    };

/**
 * Initialization-specific error types.
 */
export type InitializationError =
  | { readonly code: "MESH_CALCULATOR_NOT_INITIALIZED" }
  | {
      readonly code: "MESH_CALCULATOR_LOAD_FAILED";
      readonly moduleName: string;
      readonly cause: Error;
    };

/**
 * Factory functions for creating errors.
 */
export function createMeshcodeError(
  code: "MESHCODE_INVALID",
  meshcode: string,
  reason: string,
): MeshcodeError;
export function createMeshcodeError(
  code: "MESHCODE_PARSE_FAILED",
  input: string,
  separator: string,
): MeshcodeError;
export function createMeshcodeError(
  code: MeshcodeError["code"],
  arg1: string,
  arg2: string,
): MeshcodeError {
  if (code === "MESHCODE_INVALID") {
    return { code, meshcode: arg1, reason: arg2 };
  }
  return { code, input: arg1, separator: arg2 };
}

export function createLatLngError(
  code: "LATLNG_INVALID",
  field: "lat" | "lng",
  value: number,
  reason: string,
): LatLngError;
export function createLatLngError(
  code: "LATLNG_PARSE_FAILED",
  input: string,
  reason: string,
): LatLngError;
export function createLatLngError(
  code: "LATLNG_FORMAT_ERROR",
  field: string,
  value: string,
  expectedFormat: string,
): LatLngError;
export function createLatLngError(
  code: LatLngError["code"],
  arg1: string | "lat" | "lng",
  arg2: string | number,
  arg3?: string,
): LatLngError {
  if (code === "LATLNG_INVALID") {
    return {
      code,
      field: arg1 as "lat" | "lng",
      value: arg2 as number,
      reason: arg3 as string,
    };
  }
  if (code === "LATLNG_PARSE_FAILED") {
    return { code, input: arg1, reason: arg2 as string };
  }
  return {
    code,
    field: arg1,
    value: arg2 as string,
    expectedFormat: arg3 as string,
  };
}

/**
 * Convert any error type to AppError for unified handling.
 */
export function toAppError(error: MeshcodeError | LatLngError | InitializationError): AppError {
  switch (error.code) {
    case "MESHCODE_INVALID":
      return {
        code: error.code,
        message: `Invalid mesh code "${error.meshcode}": ${error.reason}`,
        details: { meshcode: error.meshcode, reason: error.reason },
      };
    case "MESHCODE_PARSE_FAILED":
      return {
        code: error.code,
        message: `Failed to parse mesh codes from "${error.input}"`,
        details: { input: error.input, separator: error.separator },
      };
    case "LATLNG_INVALID":
      return {
        code: error.code,
        message: `Invalid ${error.field}: ${error.value} - ${error.reason}`,
        details: { field: error.field, value: error.value, reason: error.reason },
      };
    case "LATLNG_PARSE_FAILED":
      return {
        code: error.code,
        message: `Failed to parse coordinates: ${error.reason}`,
        details: { input: error.input, reason: error.reason },
      };
    case "LATLNG_FORMAT_ERROR":
      return {
        code: error.code,
        message: `Invalid format for ${error.field}: expected ${error.expectedFormat}`,
        details: { field: error.field, value: error.value, expectedFormat: error.expectedFormat },
      };
    case "MESH_CALCULATOR_NOT_INITIALIZED":
      return {
        code: error.code,
        message: "Mesh calculator is not initialized yet. Please wait.",
      };
    case "MESH_CALCULATOR_LOAD_FAILED":
      return {
        code: error.code,
        message: `Failed to load mesh calculator module: ${error.moduleName}`,
        details: { moduleName: error.moduleName },
        cause: error.cause,
      };
  }
}

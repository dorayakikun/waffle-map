import type { AppError, ErrorCode, LatLngError, MeshcodeError } from "./types";

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  MESHCODE_INVALID: "The mesh code format is invalid. Please check the format.",
  MESHCODE_PARSE_FAILED: "Could not parse the mesh codes. Please check the separator.",
  LATLNG_INVALID: "The coordinates are outside the valid range.",
  LATLNG_PARSE_FAILED: "Could not parse the coordinates. Use format: latitude,longitude",
  LATLNG_FORMAT_ERROR: "The coordinate format is invalid.",
  MESH_CALCULATOR_NOT_INITIALIZED: "The mesh calculator is still loading. Please wait a moment.",
  MESH_CALCULATOR_LOAD_FAILED: "Failed to load the mesh calculator. Please refresh the page.",
  CLIPBOARD_ERROR: "Failed to copy to clipboard. Please try again.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
};

export function formatMeshcodeError(error: MeshcodeError): string {
  switch (error.code) {
    case "MESHCODE_INVALID":
      return `Invalid mesh code "${error.meshcode}": ${error.reason}`;
    case "MESHCODE_PARSE_FAILED":
      return `Could not parse "${error.input}" using separator "${error.separator}"`;
  }
}

export function formatLatLngError(error: LatLngError): string {
  switch (error.code) {
    case "LATLNG_INVALID":
      return `Invalid ${error.field === "lat" ? "latitude" : "longitude"}: ${error.value} is out of range`;
    case "LATLNG_PARSE_FAILED":
      return `Could not parse coordinates: ${error.reason}`;
    case "LATLNG_FORMAT_ERROR":
      return `Invalid format for ${error.field}: expected ${error.expectedFormat}, got "${error.value}"`;
  }
}

export function formatAppError(error: AppError): string {
  return error.message || ERROR_MESSAGES[error.code] || ERROR_MESSAGES.UNKNOWN_ERROR;
}

export function getDefaultMessage(code: ErrorCode): string {
  return ERROR_MESSAGES[code];
}

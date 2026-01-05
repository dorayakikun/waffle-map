/**
 * Error handling module exports.
 */

export type {
  ErrorCode,
  AppError,
  MeshcodeError,
  LatLngError,
  InitializationError,
} from "./types";

export {
  createMeshcodeError,
  createLatLngError,
  toAppError,
} from "./types";

export {
  ERROR_MESSAGES,
  formatMeshcodeError,
  formatLatLngError,
  formatAppError,
  getDefaultMessage,
} from "./messages";

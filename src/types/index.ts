/**
 * Core type definitions for the application.
 */

// Re-export branded types
export type {
  Latitude,
  Longitude,
  Zoom,
  Scale,
  MeshCode,
} from "./branded";

export {
  latitude,
  longitude,
  zoom,
  scale,
  meshCode,
  isLatitude,
  isLongitude,
  isZoom,
  isScale,
  tryLatitude,
  tryLongitude,
  tryMeshCode,
  LATITUDE_MIN,
  LATITUDE_MAX,
  LONGITUDE_MIN,
  LONGITUDE_MAX,
  SCALE_MIN,
  SCALE_MAX,
} from "./branded";

// Re-export state types
export type { AsyncState } from "./state";

export {
  idle,
  loading,
  success,
  error,
  isIdle,
  isLoading,
  isSuccess,
  isError,
  getDataOrDefault,
  mapAsyncState,
  foldAsyncState,
} from "./state";

// Domain types
export type Datum = "WGS84" | "Tokyo";
export type LatLngString = string;
export type Separator = "." | ",";
export type Unit = "degree" | "millisec";

/**
 * Available separators as a tuple for iteration.
 */
export const SEPARATORS = [".", ","] as const satisfies readonly Separator[];

/**
 * @deprecated Use MeshCode from branded types instead
 */
export type Meshcode = string;

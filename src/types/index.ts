export type {
  Latitude,
  Longitude,
  MeshCode,
  Scale,
  Zoom,
} from "./branded";

export {
  isLatitude,
  isLongitude,
  isScale,
  isZoom,
  LATITUDE_MAX,
  LATITUDE_MIN,
  LONGITUDE_MAX,
  LONGITUDE_MIN,
  latitude,
  longitude,
  meshCode,
  SCALE_MAX,
  SCALE_MIN,
  scale,
  tryLatitude,
  tryLongitude,
  tryMeshCode,
  zoom,
} from "./branded";

export type { AsyncState } from "./state";

export {
  error,
  foldAsyncState,
  getDataOrDefault,
  idle,
  isError,
  isIdle,
  isLoading,
  isSuccess,
  loading,
  mapAsyncState,
  success,
} from "./state";

export type Datum = "WGS84" | "Tokyo";
export type LatLngString = string;
export type Separator = "." | ",";
export type Unit = "degree" | "millisec";

export const SEPARATORS = [".", ","] as const satisfies readonly Separator[];

export type Meshcode = string;

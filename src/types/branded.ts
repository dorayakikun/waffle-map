declare const brand: unique symbol;

type Brand<T, B extends string> = T & { readonly [brand]: B };

export type Latitude = Brand<number, "Latitude">;

export type Longitude = Brand<number, "Longitude">;

export type Zoom = Brand<number, "Zoom">;

export type Scale = Brand<number, "Scale">;

export type MeshCode = Brand<string, "MeshCode">;

export const LATITUDE_MIN = -90;
export const LATITUDE_MAX = 90;

export const LONGITUDE_MIN = -180;
export const LONGITUDE_MAX = 180;

export const SCALE_MIN = 1;
export const SCALE_MAX = 6;

export function latitude(value: number): Latitude {
  if (!Number.isFinite(value)) {
    throw new RangeError(`Latitude must be a finite number, got ${value}`);
  }
  if (value < LATITUDE_MIN || value > LATITUDE_MAX) {
    throw new RangeError(
      `Latitude must be between ${LATITUDE_MIN} and ${LATITUDE_MAX}, got ${value}`,
    );
  }
  return value as Latitude;
}

export function longitude(value: number): Longitude {
  if (!Number.isFinite(value)) {
    throw new RangeError(`Longitude must be a finite number, got ${value}`);
  }
  if (value < LONGITUDE_MIN || value > LONGITUDE_MAX) {
    throw new RangeError(
      `Longitude must be between ${LONGITUDE_MIN} and ${LONGITUDE_MAX}, got ${value}`,
    );
  }
  return value as Longitude;
}

export function zoom(value: number): Zoom {
  if (!Number.isInteger(value)) {
    throw new RangeError(`Zoom must be an integer, got ${value}`);
  }
  if (value < 0 || value > 22) {
    throw new RangeError(`Zoom must be between 0 and 22, got ${value}`);
  }
  return value as Zoom;
}

export function scale(value: number): Scale {
  if (!Number.isInteger(value)) {
    throw new RangeError(`Scale must be an integer, got ${value}`);
  }
  if (value < SCALE_MIN || value > SCALE_MAX) {
    throw new RangeError(`Scale must be between ${SCALE_MIN} and ${SCALE_MAX}, got ${value}`);
  }
  return value as Scale;
}

export function meshCode(value: string): MeshCode {
  if (typeof value !== "string" || value.trim() === "") {
    throw new TypeError("Mesh code must be a non-empty string");
  }
  return value.trim() as MeshCode;
}

export function isLatitude(value: number): value is Latitude {
  return Number.isFinite(value) && value >= LATITUDE_MIN && value <= LATITUDE_MAX;
}

export function isLongitude(value: number): value is Longitude {
  return Number.isFinite(value) && value >= LONGITUDE_MIN && value <= LONGITUDE_MAX;
}

export function isZoom(value: number): value is Zoom {
  return Number.isInteger(value) && value >= 0 && value <= 22;
}

export function isScale(value: number): value is Scale {
  return Number.isInteger(value) && value >= SCALE_MIN && value <= SCALE_MAX;
}

export function tryLatitude(value: number): Latitude | null {
  return isLatitude(value) ? (value as Latitude) : null;
}

export function tryLongitude(value: number): Longitude | null {
  return isLongitude(value) ? (value as Longitude) : null;
}

export function tryMeshCode(value: string): MeshCode | null {
  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }
  return value.trim() as MeshCode;
}

/**
 * Branded types for type-safe handling of domain values.
 *
 * Branded types prevent accidental mixing of values that have the same
 * underlying type but different semantic meanings (e.g., latitude vs longitude).
 */

declare const brand: unique symbol;

type Brand<T, B extends string> = T & { readonly [brand]: B };

/**
 * Latitude value (-90 to 90 degrees).
 */
export type Latitude = Brand<number, "Latitude">;

/**
 * Longitude value (-180 to 180 degrees).
 */
export type Longitude = Brand<number, "Longitude">;

/**
 * Zoom level for the map.
 */
export type Zoom = Brand<number, "Zoom">;

/**
 * Scale level for mesh codes (1-6).
 */
export type Scale = Brand<number, "Scale">;

/**
 * A validated mesh code string.
 */
export type MeshCode = Brand<string, "MeshCode">;

/**
 * Latitude range constants.
 */
export const LATITUDE_MIN = -90;
export const LATITUDE_MAX = 90;

/**
 * Longitude range constants.
 */
export const LONGITUDE_MIN = -180;
export const LONGITUDE_MAX = 180;

/**
 * Scale range constants.
 */
export const SCALE_MIN = 1;
export const SCALE_MAX = 6;

/**
 * Create a validated Latitude value.
 * @throws RangeError if value is outside valid range
 */
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

/**
 * Create a validated Longitude value.
 * @throws RangeError if value is outside valid range
 */
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

/**
 * Create a validated Zoom value.
 * @throws RangeError if value is outside valid range
 */
export function zoom(value: number): Zoom {
  if (!Number.isInteger(value)) {
    throw new RangeError(`Zoom must be an integer, got ${value}`);
  }
  if (value < 0 || value > 22) {
    throw new RangeError(`Zoom must be between 0 and 22, got ${value}`);
  }
  return value as Zoom;
}

/**
 * Create a validated Scale value.
 * @throws RangeError if value is outside valid range
 */
export function scale(value: number): Scale {
  if (!Number.isInteger(value)) {
    throw new RangeError(`Scale must be an integer, got ${value}`);
  }
  if (value < SCALE_MIN || value > SCALE_MAX) {
    throw new RangeError(
      `Scale must be between ${SCALE_MIN} and ${SCALE_MAX}, got ${value}`,
    );
  }
  return value as Scale;
}

/**
 * Create a MeshCode from a string.
 * Note: This does basic validation only. Full validation is done by the mesh calculator.
 * @throws TypeError if value is not a non-empty string
 */
export function meshCode(value: string): MeshCode {
  if (typeof value !== "string" || value.trim() === "") {
    throw new TypeError("Mesh code must be a non-empty string");
  }
  return value.trim() as MeshCode;
}

/**
 * Type guard for checking if a number is a valid latitude.
 */
export function isLatitude(value: number): value is Latitude {
  return Number.isFinite(value) && value >= LATITUDE_MIN && value <= LATITUDE_MAX;
}

/**
 * Type guard for checking if a number is a valid longitude.
 */
export function isLongitude(value: number): value is Longitude {
  return Number.isFinite(value) && value >= LONGITUDE_MIN && value <= LONGITUDE_MAX;
}

/**
 * Type guard for checking if a number is a valid zoom level.
 */
export function isZoom(value: number): value is Zoom {
  return Number.isInteger(value) && value >= 0 && value <= 22;
}

/**
 * Type guard for checking if a number is a valid scale.
 */
export function isScale(value: number): value is Scale {
  return Number.isInteger(value) && value >= SCALE_MIN && value <= SCALE_MAX;
}

/**
 * Safely create a Latitude, returning null if invalid.
 */
export function tryLatitude(value: number): Latitude | null {
  return isLatitude(value) ? (value as Latitude) : null;
}

/**
 * Safely create a Longitude, returning null if invalid.
 */
export function tryLongitude(value: number): Longitude | null {
  return isLongitude(value) ? (value as Longitude) : null;
}

/**
 * Safely create a MeshCode, returning null if invalid.
 */
export function tryMeshCode(value: string): MeshCode | null {
  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }
  return value.trim() as MeshCode;
}

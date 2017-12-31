// @flow
import type { LatLng, Bounds } from './calculateMesh';

const createFormatErrorMessage =
  (name: string, value: string): string => (`Unexpected ${name} found.
Expected: lat,lng
Actual: ${value}`);

const isNumber = (str: string): boolean =>
  (str.match(/^([1-9]\d*|0)(\.\d+)?$/) != null);

const createNumberErrorMessage =
  (name: string, value: string): string => (`Unexpected ${name} found.
Only numbers are acceptable.
Actual: ${value}`);

/**
 * Creates a degree LatLng from string.
 * @param {string} latString 
 * @param {string} lngString 
 * @returns {LatLng} a degree LatLng
 */
const createDegreeLatLng =
  (latString: string, lngString: string): LatLng => ({
    lat: parseFloat(latString),
    lng: parseFloat(lngString),
  });

/**
 * Creates a millisec LatLng from string.
 * @param {string} latString 
 * @param {string} lngString 
 * @returns {LatLng} a millisec LatLng
 */
const createMillisecLatLng =
  (latString: string, lngString: string): LatLng => ({
    lat: parseInt(latString, 10) / 3600000,
    lng: parseInt(lngString, 10) / 3600000,
  });

/**
 * Creates a LatLng according to the unit.
 * @param {string} latLng 
 * @param {string} unit 
 * @returns {LatLng} a LatLng according to the unit.
 */
export const createLatLng =
  (latLng: string, unit: string): LatLng => {
    const latLngArray = latLng.split(',');

    if (latLngArray.length !== 2) {
      throw new Error(createFormatErrorMessage('LatLng', latLng));
    }

    const latString = latLngArray[0].trim();
    const lngString = latLngArray[1].trim();
    if (!isNumber(latString)) {
      throw new Error(createNumberErrorMessage('lat', latLng));
    }
    if (!isNumber(lngString)) {
      throw new Error(createNumberErrorMessage('lng', latLng));
    }

    return unit === 'degree' ?
      createDegreeLatLng(latString, lngString) :
      createMillisecLatLng(latString, lngString);
  };

export const convertLatLngToTokyo = (latLng: LatLng): LatLng => {
  const wx = latLng.lng;
  const wy = latLng.lat;
  return {
    lat: wy * 1.000106961 - wx * 0.000017467 - 0.004602017,
    lng: wx * 1.000083049 + wy * 0.000046047 - 0.010041046,
  };
};

export const convertBoundsToTokyo = (bounds: Bounds): Bounds => ({
  leftTop: convertLatLngToTokyo(bounds.leftTop),
  rightBottom: convertLatLngToTokyo(bounds.rightBottom),
});

export const convertLatLngToWGS84 = (latLng: LatLng): LatLng => {
  const jx = latLng.lng;
  const jy = latLng.lat;
  return {
    lat: jy - jy * 0.00010695 + jx * 0.000017464 + 0.0046017,
    lng: jx - jy * 0.000046038 - jx * 0.000083043 + 0.01004,
  };
};

export const convertBoundsToWGS84 = (bounds: Bounds): Bounds => ({
  leftTop: convertLatLngToWGS84(bounds.leftTop),
  rightBottom: convertLatLngToWGS84(bounds.rightBottom),
});

export const convertLatLngToMillisec = (latLng: LatLng): LatLng => ({
  lat: Math.trunc(latLng.lat * 3600000),
  lng: Math.trunc(latLng.lng * 3600000),
});

export const convertBoundsToMillisec = (bounds: Bounds): Bounds => ({
  leftTop: convertLatLngToMillisec(bounds.leftTop),
  rightBottom: convertLatLngToMillisec(bounds.rightBottom),
});

/**
 * Apply datum to bounds.
 *
 * @param {Bounds} bounds bounds
 * @param {string} datum datum(tokyo/wgs84)
 * @returns {Bounds} bounds
 */
export const convertBoundsToWGS84IfNeeded =
  (bounds: Bounds, datum: string): Bounds => (
    datum === 'Tokyo' ? convertBoundsToWGS84(bounds) : bounds
  );

export const convertLatLngToTokyoIfNeeded =
  (latLng: LatLng, datum: string): LatLng => (
    datum === 'Tokyo' ? convertLatLngToTokyo(latLng) : latLng
  );

export const convertLatLngToWGS84IfNeeded =
  (latLng: LatLng, datum: string): LatLng => (
    datum === 'Tokyo' ? convertLatLngToWGS84(latLng) : latLng
  );

export const convertLatLngToMillisecIfNeeded =
  (latLng: LatLng, unit: string): LatLng => (
    unit === 'millisec' ? convertLatLngToMillisec(latLng) : latLng
  );

export const convertBoundsToMillisecIfNeeded =
  (bounds: Bounds, unit: string): Bounds => (
    unit === 'millisec' ? convertBoundsToMillisec(bounds) : bounds
  );
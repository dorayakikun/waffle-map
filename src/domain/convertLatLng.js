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

const createDegreeLatLng =
  (latString: string, lngString: string): LatLng => ({
    lat: parseFloat(latString),
    lng: parseFloat(lngString),
  });

const createMillisecLatLng =
  (latString: string, lngString: string): LatLng => ({
    lat: parseInt(latString, 10) / 3600000,
    lng: parseInt(lngString, 10) / 3600000,
  });

export const convertToMillisecLatLng =
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

export const convertLatLngToTokyoDatum = (latLng: LatLng): LatLng => {
  const wx = latLng.lng;
  const wy = latLng.lat;
  return {
    lat: wy * 1.000106961 - wx * 0.000017467 - 0.004602017,
    lng: wx * 1.000083049 + wy * 0.000046047 - 0.010041046,
  };
};

export const convertBoundsToTokyoDatum = (bounds: Bounds): Bounds => ({
  leftTop: convertLatLngToTokyoDatum(bounds.leftTop),
  rightBottom: convertLatLngToTokyoDatum(bounds.rightBottom),
});

export const convertLatLngToWGS84Datum = (latLng: LatLng): LatLng => {
  const jx = latLng.lng;
  const jy = latLng.lat;
  return {
    lat: jy - jy * 0.00010695 + jx * 0.000017464 + 0.0046017,
    lng: jx - jy * 0.000046038 - jx * 0.000083043 + 0.01004,
  };
};

export const convertBoundsToWGS84Datum = (bounds: Bounds): Bounds => ({
  leftTop: convertLatLngToWGS84Datum(bounds.leftTop),
  rightBottom: convertLatLngToWGS84Datum(bounds.rightBottom),
});

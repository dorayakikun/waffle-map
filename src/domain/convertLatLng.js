// @flow
import type { LatLng, Bounds } from './calculateMesh';

export function convertToMillisecLatLng(latLng: string, unit: string): LatLng {
  const latLngArray = latLng.split(',');

  if (latLngArray.length !== 2) {
    throw new Error(`Unexpected LatLng found.
Expected: lat,lng
Actual: ${latLng}`);
  }

  const latString = latLngArray[0].trim();
  const lngString = latLngArray[1].trim();

  if (!latString.match(/^([1-9]\d*|0)(\.\d+)?$/)) {
    throw new Error(`Unexpected lat found.
Only numbers are acceptable.
Actual: ${latLng}`);
  }

  if (!lngString.match(/^([1-9]\d*|0)(\.\d+)?$/)) {
    throw new Error(`Unexpected lng found.
Only numbers are acceptable.
Actual: ${latLng}`);
  }

  if (unit === 'degree') {
    return {
      lat: parseFloat(latString),
      lng: parseFloat(lngString),
    };
  }

  return {
    lat: parseInt(latString, 10) / 3600000,
    lng: parseInt(lngString, 10) / 3600000,
  };
}

export function convertLatLngToTokyoDatum(latLng: LatLng): LatLng {
  const wx = latLng.lng;
  const wy = latLng.lat;
  return {
    lat: wy * 1.000106961 - wx * 0.000017467 - 0.004602017,
    lng: wx * 1.000083049 + wy * 0.000046047 - 0.010041046,
  };
}

export function convertBoundsToTokyoDatum(bounds: Bounds): Bounds {
  return {
    leftTop: convertLatLngToTokyoDatum(bounds.leftTop),
    rightBottom: convertLatLngToTokyoDatum(bounds.rightBottom),
  };
}

export function convertLatLngToWGS84Datum(latLng: LatLng): LatLng {
  const jx = latLng.lng;
  const jy = latLng.lat;
  return {
    lat: jy - jy * 0.00010695 + jx * 0.000017464 + 0.0046017,
    lng: jx - jy * 0.000046038 - jx * 0.000083043 + 0.01004,
  };
}

export function convertBoundsToWGS84Datum(bounds: Bounds): Bounds {
  return {
    leftTop: convertLatLngToWGS84Datum(bounds.leftTop),
    rightBottom: convertLatLngToWGS84Datum(bounds.rightBottom),
  };
}

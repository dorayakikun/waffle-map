import type { Bounds, LatLng } from "./calculateMesh";

function createFormatErrorMessage(name: string, value: string): string {
  return `Unexpected ${name} found.
Expected: lat,lng
Actual: ${value}`;
}

function isNumber(str: string): boolean {
  return /^-?([1-9]\d*|0)(\.\d+)?$/.test(str);
}

function createNumberErrorMessage(name: string, value: string): string {
  return `Unexpected ${name} found.
Only numbers are acceptable.
Actual: ${value}`;
}

function createDegreeLatLng(latString: string, lngString: string): LatLng {
  return {
    lat: Number.parseFloat(latString),
    lng: Number.parseFloat(lngString),
  };
}

function createMillisecLatLng(latString: string, lngString: string): LatLng {
  return {
    lat: Number.parseInt(latString, 10) / 3600000,
    lng: Number.parseInt(lngString, 10) / 3600000,
  };
}

export function createLatLng(latLng: string, unit: string): LatLng {
  const latLngArray = latLng.split(",");

  if (latLngArray.length !== 2) {
    throw new Error(createFormatErrorMessage("LatLng", latLng));
  }

  const latString = latLngArray[0].trim();
  const lngString = latLngArray[1].trim();
  if (!isNumber(latString)) {
    throw new Error(createNumberErrorMessage("lat", latLng));
  }
  if (!isNumber(lngString)) {
    throw new Error(createNumberErrorMessage("lng", latLng));
  }

  return unit === "degree"
    ? createDegreeLatLng(latString, lngString)
    : createMillisecLatLng(latString, lngString);
}

export function convertLatLngToTokyo(latLng: LatLng): LatLng {
  const wx = latLng.lng;
  const wy = latLng.lat;
  return {
    lat: wy * 1.000106961 - wx * 0.000017467 - 0.004602017,
    lng: wx * 1.000083049 + wy * 0.000046047 - 0.010041046,
  };
}

export function convertBoundsToTokyo(bounds: Bounds): Bounds {
  return {
    leftTop: convertLatLngToTokyo(bounds.leftTop),
    rightBottom: convertLatLngToTokyo(bounds.rightBottom),
  };
}

export function convertLatLngToWGS84(latLng: LatLng): LatLng {
  const jx = latLng.lng;
  const jy = latLng.lat;
  return {
    lat: jy - jy * 0.00010695 + jx * 0.000017464 + 0.0046017,
    lng: jx - jy * 0.000046038 - jx * 0.000083043 + 0.01004,
  };
}

export function convertBoundsToWGS84(bounds: Bounds): Bounds {
  return {
    leftTop: convertLatLngToWGS84(bounds.leftTop),
    rightBottom: convertLatLngToWGS84(bounds.rightBottom),
  };
}

export function convertLatLngToMillisec(latLng: LatLng): LatLng {
  return {
    lat: Math.trunc(latLng.lat * 3600000),
    lng: Math.trunc(latLng.lng * 3600000),
  };
}

export function convertBoundsToMillisec(bounds: Bounds): Bounds {
  return {
    leftTop: convertLatLngToMillisec(bounds.leftTop),
    rightBottom: convertLatLngToMillisec(bounds.rightBottom),
  };
}

export function convertBoundsToWGS84IfNeeded(bounds: Bounds, datum: string): Bounds {
  return datum === "Tokyo" ? convertBoundsToWGS84(bounds) : bounds;
}

export function convertBoundsToTokyoIfNeeded(bounds: Bounds, datum: string): Bounds {
  return datum === "Tokyo" ? convertBoundsToTokyo(bounds) : bounds;
}

export function convertLatLngToTokyoIfNeeded(latLng: LatLng, datum: string): LatLng {
  return datum === "Tokyo" ? convertLatLngToTokyo(latLng) : latLng;
}

export function convertLatLngToWGS84IfNeeded(latLng: LatLng, datum: string): LatLng {
  return datum === "Tokyo" ? convertLatLngToWGS84(latLng) : latLng;
}

export function convertLatLngToMillisecIfNeeded(latLng: LatLng, unit: string): LatLng {
  return unit === "millisec" ? convertLatLngToMillisec(latLng) : latLng;
}

export function convertBoundsToMillisecIfNeeded(bounds: Bounds, unit: string): Bounds {
  return unit === "millisec" ? convertBoundsToMillisec(bounds) : bounds;
}

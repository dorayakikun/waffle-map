// @flow
import type { LatLng } from './calculateMesh'

export function convertToMillisecLatLng(latLng: string, unit: string): LatLng {
  const latLngArray = latLng.split(',')

  if (latLngArray.length !== 2) {
    throw new Error(`Unexpected LatLng found.
Expected: lat,lng
Actual: ${latLng}`)
  }

  const latString = latLngArray[0].trim()
  const lngString = latLngArray[1].trim()

  if (!latString.match(/^([1-9]\d*|0)(\.\d+)?$/)) {
    throw new Error(`Unexpected lat found.
Only numbers are acceptable.
Actual: ${latString}`)
  }

  if (!lngString.match(/^([1-9]\d*|0)(\.\d+)?$/)) {
    throw new Error(`Unexpected lng found.
Only numbers are acceptable.
Actual: ${lngString}`)
  }

  if (unit === 'degree') {
    return {
      lat: parseFloat(latString),
      lng: parseFloat(lngString)
    }
  }

  return {
    lat: parseInt(latString, 10) / 3600000,
    lng: parseInt(lngString, 10) / 3600000
  }
}

export function convertLatLngToTokyoDatum(latLng: LatLng): LatLng {
  const wx = latLng.lng
  const wy = latLng.lat
  return {
    lat: wy * 1.000106961 - wx * 0.000017467 - 0.004602017,
    lng: wx * 1.000083049 + wy * 0.000046047 - 0.010041046
  }
}

export function convertBoundsToTokyoDatum(bounds: Bounds): Bounds {
  return {
    leftTop: convertLatLngToTokyoDatum(bounds.leftTop),
    rightBottom: convertLatLngToTokyoDatum(bounds.rightBottom)
  }
}

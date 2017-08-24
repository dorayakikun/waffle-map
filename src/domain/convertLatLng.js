// @flow
import type { LatLng } from './calculateMesh'

export function convertToMillisecLatLng(latLng: string, datum: string): LatLng {
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

  if (datum === 'degree') {
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

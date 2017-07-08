// @flow

export type LatLng = {
  lat: number,
  lng: number
}
export type Bounds = {
  leftTop: LatLng,
  rightBottom: LatLng
}

/**
 * Convert mesh to LatLng.
 *
 * @param mesh mesh
 * @returns {LatLng} latitude and longitude
 */
export function meshToLatLng(mesh: string): LatLng {
  const newMesh = mesh.replace(/-/g, '')
  const len = newMesh.length
  switch (len) {
    case 4:
      return firstMeshToLatLng(newMesh)
    case 6:
      return secondMeshToLatLng(newMesh)
    case 8:
      return thirdMeshToLatLng(newMesh)
    default:
      throw new Error(`Unexpected length. mesh is ${newMesh}`)
  }
}

/**
 * Convert first mesh to LatLng.
 *
 * @param mesh first mesh
 * @returns {LatLng} latitude and longitude
 */
function firstMeshToLatLng(mesh: string): LatLng {
  if (!mesh.match(/\d{4}/)) {
    throw new Error(
      `Invalid mesh code found.
Only numbers are acceptable.
Actual mesh code is ${mesh}`
    )
  }
  const meshLat = parseInt(mesh.substr(0, 2))
  const meshLng = parseInt(mesh.substr(2))
  return {
    lat: meshLat / 1.5 + 1 / 3,
    lng: meshLng + 100 + 1 / 2
  }
}

/**
 * Convert second mesh to LatLng.
 *
 * @param mesh second mesh
 * @returns {LatLng} latitude and longitude
 */
function secondMeshToLatLng(mesh: string): LatLng {
  if (!mesh.match(/\d{6}/)) {
    throw new Error(
      `Invalid mesh code found.
Only numbers are acceptable.
Actual mesh code is ${mesh}`
    )
  }
  const firstMeshLat = parseInt(mesh.substr(0, 2))
  const firstMeshLng = parseInt(mesh.substr(2, 2))
  const secondMeshLat = parseInt(mesh.substr(4, 1))
  const secondMeshLng = parseInt(mesh.substr(5))

  if (secondMeshLat > 7 || secondMeshLng > 7) {
    throw new Error(
      `Invalid mesh code found.
Only [0-7] are acceptable in second division.
Actual mesh code is ${mesh}`
    )
  }

  return {
    lat: (firstMeshLat + secondMeshLat / 8) / 1.5 + 1 / 24,
    lng: firstMeshLng + secondMeshLng / 8 + 100 + 1 / 16
  }
}

/**
 * Convert third mesh to LatLng.
 *
 * @param mesh third mesh
 * @returns {LatLng} latitude and longitude
 */
function thirdMeshToLatLng(mesh: string): LatLng {
  if (!mesh.match(/\d{8}/)) {
    throw new Error(
      `Invalid mesh code found.
Only numbers are acceptable.
Actual mesh code is ${mesh}`
    )
  }

  const firstMeshLat = parseInt(mesh.substr(0, 2))
  const firstMeshLng = parseInt(mesh.substr(2, 2))
  const secondMeshLat = parseInt(mesh.substr(4, 1))
  const secondMeshLng = parseInt(mesh.substr(5, 1))
  const thirdMeshLat = parseInt(mesh.substr(6, 1))
  const thirdMeshLng = parseInt(mesh.substr(7))

  if (secondMeshLat > 7 || secondMeshLng > 7) {
    throw new Error(
      `Invalid mesh code found.
Only [0-7] are acceptable in second division.
Actual mesh code is ${mesh}`
    )
  }

  return {
    lat:
      (firstMeshLat + (secondMeshLat + thirdMeshLat / 10) / 8) / 1.5 + 1 / 240,
    lng: firstMeshLng + (secondMeshLng + thirdMeshLng / 10) / 8 + 100 + 1 / 160
  }
}

/**
 * Convert mesh to bounds.
 * @param mesh mesh
 * @returns {Bounds} bounds
 */
export function meshToBounds(mesh: string): Bounds {
  const newMesh = mesh.replace(/-/g, '')

  const len = newMesh.length
  switch (len) {
    case 4:
      return meshToFirstMeshBounds(newMesh)
    case 6:
      return meshToSecondMeshBounds(newMesh)
    case 8:
      return meshToThirdMeshBounds(newMesh)
    default:
      throw new Error(`Unexpected length. mesh is ${newMesh}`)
  }
}

/**
 * Convert mesh to first mesh bounds.
 * @param mesh mesh
 * @returns {Bounds}
 */
function meshToFirstMeshBounds(mesh: string): Bounds {
  if (!mesh.match(/\d{4}/)) {
    throw new Error(
      `Invalid mesh code found.
Only numbers are acceptable.
Actual mesh code is ${mesh}`
    )
  }

  const lat = parseInt(mesh.substr(0, 2))
  const lng = parseInt(mesh.substr(2, 2))
  const originLat = lat / 1.5
  const originLng = lng + 100

  return {
    leftTop: { lat: originLat + 2 / 3, lng: originLng },
    rightBottom: { lat: originLat, lng: originLng + 1 }
  }
}

/**
 * Convert mesh to second mesh bounds.
 *
 * @param mesh mesh
 * @returns {Bounds}
 */
function meshToSecondMeshBounds(mesh: string): Bounds {
  if (!mesh.match(/\d{6}/)) {
    throw new Error(
      `Invalid mesh code found.
Only numbers are acceptable.
Actual mesh code is ${mesh}`
    )
  }

  const firstLat = parseInt(mesh.substr(0, 2))
  const firstLng = parseInt(mesh.substr(2, 2))
  const secondMeshLat = parseInt(mesh.substr(4, 1))
  const secondMeshLng = parseInt(mesh.substr(5))

  if (secondMeshLat > 7 || secondMeshLng > 7) {
    throw new Error(
      `Invalid mesh code found.
Only [0-7] are acceptable in second division.
Actual mesh code is ${mesh}`
    )
  }

  const originLat = (firstLat + secondMeshLat / 8) / 1.5
  const originLng = firstLng + secondMeshLng / 8 + 100

  return {
    leftTop: { lat: originLat + 1 / 12, lng: originLng },
    rightBottom: { lat: originLat, lng: originLng + 1 / 8 }
  }
}

/**
 * Convert mesh to third mesh bounds.
 *
 * @param mesh mesh
 * @returns {Bounds}
 */
function meshToThirdMeshBounds(mesh: string): Bounds {
  if (!mesh.match(/\d{8}/)) {
    throw new Error(
      `Invalid mesh code found.
Only numbers are acceptable.
Actual mesh code is ${mesh}`
    )
  }

  const firstLat = parseInt(mesh.substr(0, 2))
  const firstLng = parseInt(mesh.substr(2, 2))
  const secondMeshLat = parseInt(mesh.substr(4, 1))
  const secondMeshLng = parseInt(mesh.substr(5, 1))
  const thirdMeshLat = parseInt(mesh.substr(6, 1))
  const thirdMeshLng = parseInt(mesh.substr(7))

  if (secondMeshLat > 7 || secondMeshLng > 7) {
    throw new Error(
      `Invalid mesh code found.
Only [0-7] are acceptable in second division.
Actual mesh code is ${mesh}`
    )
  }

  const originLat = (firstLat + (secondMeshLat + thirdMeshLat / 10) / 8) / 1.5
  const originLng = firstLng + (secondMeshLng + thirdMeshLng / 10) / 8 + 100

  return {
    leftTop: { lat: originLat + 1 / 120, lng: originLng },
    rightBottom: { lat: originLat, lng: originLng + 1 / 80 }
  }
}

/**
 * Convert LatLng to mesh.
 *
 * @param lat latitude
 * @param lng longitude
 * @param scale scale
 * @returns {string} mesh.
 */
export function latLngToMesh(lat: number, lng: number, scale: number): string {
  switch (scale) {
    case 1:
      return latLngToFirstMesh(lat, lng)
    case 2:
      return latLngToSecondMesh(lat, lng)
    case 3:
      return latLngToThirdMesh(lat, lng)
    default:
      throw new Error(`Illegal scale. scale is ${scale}`)
  }
}

/**
 * Convert LatLng to first mesh.
 *
 * @param lat latitude
 * @param lng longitude
 * @returns {string} first mesh
 */
function latLngToFirstMesh(lat: number, lng: number): string {
  const meshLat = parseInt(lat * 1.5).toString()
  const meshLng = parseInt(lng - 100).toString()
  return meshLat + meshLng
}

/**
 * Convert LatLng to second mesh.
 *
 * @param lat latitude
 * @param lng longitude
 * @returns {string} second mesh
 */
function latLngToSecondMesh(lat: number, lng: number): string {
  const firstMeshLat = lat * 1.5
  const firstMeshLng = lng - 100

  const meshLat = `${parseInt((firstMeshLat - parseInt(firstMeshLat)) * 8)}`
  const meshLng = `${parseInt((firstMeshLng - parseInt(firstMeshLng)) * 8)}`
  return `${latLngToFirstMesh(lat, lng)}-${meshLat}${meshLng}`
}

/**
 * Convert LatLng to third mesh.
 *
 * @param lat latitude
 * @param lng longitude
 * @returns {string} third mesh
 */
function latLngToThirdMesh(lat: number, lng: number): string {
  const secondMeshLat = (lat * 1.5 - parseInt(lat * 1.5)) * 8
  const secondMeshLng = (lng - 100 - parseInt(lng - 100)) * 8

  const meshLat = `${parseInt((secondMeshLat - parseInt(secondMeshLat)) * 10)}`
  const meshLng = `${parseInt((secondMeshLng - parseInt(secondMeshLng)) * 10)}`
  return `${latLngToSecondMesh(lat, lng)}-${meshLat}${meshLng}`
}

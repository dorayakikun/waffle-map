// @flow

export type LatLon = {
  lat: number,
  lon: number
}

/**
 * Convert mesh to LatLon.
 *
 * @param mesh mesh
 * @returns {LatLon} latitude and longitude
 */
export function meshToLatLon(mesh: string): LatLon {
  const newMesh = mesh.replace(/\D/g, '')

  const len = newMesh.length
  if (len < 4) {
    throw new Error(`Illegal format. mesh is ${mesh}`)
  }
  switch (len) {
    case 4:
      return firstMeshToLatLon(newMesh)
    case 6:
      return secondMeshToLatLon(newMesh)
    case 8:
      return thirdMeshToLatLon(newMesh)
    default:
      throw new Error(`Unexpected length. mesh is ${mesh}`)
  }
}

/**
 * Convert first mesh to LatLon.
 *
 * @param mesh first mesh
 * @returns {LatLon} latitude and longitude
 */
function firstMeshToLatLon(mesh: string): LatLon {
  const meshLat = parseInt(mesh.substr(0, 2))
  const meshLon = parseInt(mesh.substr(2))

  if (isNaN(meshLat) || isNaN(meshLon)) {
    throw new Error(`Illegal format. mesh is ${mesh}`)
  }

  return {
    lat: meshLat / 1.5 + 2 / 3,
    lon: meshLon + 100 + 1 / 2
  }
}

/**
 * Convert second mesh to LatLon.
 *
 * @param mesh second mesh
 * @returns {LatLon} latitude and longitude
 */
function secondMeshToLatLon(mesh: string): LatLon {
  const firstMeshLatLon = firstMeshToLatLon(mesh.substr(0, 4))
  const secondMeshLat = parseInt(mesh.substr(4, 1))
  const secondMeshLon = parseInt(mesh.substr(5))

  if (isNaN(secondMeshLat) || isNaN(secondMeshLon)) {
    throw new Error(`Illegal format. mesh is ${mesh}`)
  }

  return {
    lat: firstMeshLatLon.lat + secondMeshLat / 8 + 1 / 12,
    lon: firstMeshLatLon.lon + secondMeshLon / 8 + 1 / 8
  }
}

/**
 * Convert third mesh to LatLon.
 *
 * @param mesh third mesh
 * @returns {LatLon} latitude and longitude
 */
function thirdMeshToLatLon(mesh: string): LatLon {
  const secondMeshLatLon = secondMeshToLatLon(mesh.substr(0, 6))
  const thirdMeshLat = parseInt(mesh.substr(6, 1))
  const thirdMeshLon = parseInt(mesh.substr(7))

  if (isNaN(thirdMeshLat) || isNaN(thirdMeshLon)) {
    throw new Error(`Illegal format. mesh is ${mesh}`)
  }

  return {
    lat: secondMeshLatLon.lat + thirdMeshLat / 10 + 1 / 120,
    lon: secondMeshLatLon.lon + thirdMeshLon / 10 + 1 / 80
  }
}

/**
 * Convert mesh to bounds.
 * @param mesh mesh
 * @returns {Array<Array<number>>} bounds
 */
export function meshToBounds(mesh: string): Array<Array<number>> {
  const newMesh = mesh.replace(/\D/g, '')

  const len = newMesh.length
  if (len < 4) {
    throw new Error(`Illegal format. mesh is ${mesh}`)
  }
  switch (len) {
    case 4:
      return meshToFirstMeshBounds(newMesh)
    case 6:
      return meshToSecondMeshBounds(newMesh)
    case 8:
      return meshToThirdMeshBounds(newMesh)
    default:
      throw new Error(`Unexpected length. mesh is ${mesh}`)
  }
}

/**
 * Convert mesh to first mesh bounds.
 * @param mesh mesh
 * @returns {Array<Array<number>>}
 */
function meshToFirstMeshBounds(mesh: String): Array<Array<number>> {
  const meshLat = parseInt(mesh.substr(0, 2))
  const meshLon = parseInt(mesh.substr(2, 2))

  if (isNaN(meshLat) || isNaN(meshLon)) {
    throw new Error(`Illegal format. mesh is ${mesh}`)
  }

  const leftLat = meshLat / 1.5
  const leftLon = meshLon + 100

  return [[leftLat + 2 / 3, leftLon], [leftLat, leftLon + 1]]
}

/**
 * Convert mesh to second mesh bounds.
 *
 * @param mesh mesh
 * @returns {Array<Array<number>>}
 */
function meshToSecondMeshBounds(mesh: String): Array<Array<number>> {
  const meshLat = parseInt(mesh.substr(0, 2))
  const meshLon = parseInt(mesh.substr(2, 2))

  const secondMeshLat = parseInt(mesh.substr(4, 1))
  const secondMeshLon = parseInt(mesh.substr(5))

  if (
    isNaN(meshLat) ||
    isNaN(meshLon) ||
    isNaN(secondMeshLat) ||
    isNaN(secondMeshLon)
  ) {
    throw new Error(`Illegal format. mesh is ${mesh}`)
  }

  const leftLat = meshLat / 1.5 + secondMeshLat / 8
  const leftLon = meshLon + 100 + secondMeshLon / 8

  return [[leftLat + 1 / 12, leftLon], [leftLat, leftLon + 1 / 8]]
}

/**
 * Convert mesh to third mesh bounds.
 *
 * @param mesh mesh
 * @returns {Array<Array<number>>}
 */
function meshToThirdMeshBounds(mesh: String): Array<Array<number>> {
  const meshLat = parseInt(mesh.substr(0, 2))
  const meshLon = parseInt(mesh.substr(2, 2))

  const secondMeshLat = parseInt(mesh.substr(4, 1))
  const secondMeshLon = parseInt(mesh.substr(5, 1))

  const thirdMeshLat = parseInt(mesh.substr(6, 1))
  const thirdMeshLon = parseInt(mesh.substr(7))

  if (
    isNaN(meshLat) ||
    isNaN(meshLon) ||
    isNaN(secondMeshLat) ||
    isNaN(secondMeshLon) ||
    isNaN(thirdMeshLat) ||
    isNaN(thirdMeshLon)
  ) {
    throw new Error(`Illegal format. mesh is ${mesh}`)
  }

  const leftLat = meshLat / 1.5 + secondMeshLat / 8 + thirdMeshLat / 10
  const leftLon = meshLon + 100 + secondMeshLon / 8 + thirdMeshLon / 10

  return [[leftLat + 1 / 120, leftLon], [leftLat, leftLon + 1 / 80]]
}

/**
 * Convert LatLon to mesh.
 *
 * @param lat latitude
 * @param lon longitude
 * @param scale scale
 * @returns {string} mesh.
 */
export function latLonToMesh(lat: number, lon: number, scale: number): string {
  switch (scale) {
    case 1:
      return latLonToFirstMesh(lat, lon)
    case 2:
      return latLonToSecondMesh(lat, lon)
    case 3:
      return latLonToThirdMesh(lat, lon)
    default:
      throw new Error(`Illegal scale. scale is ${scale}`)
  }
}

/**
 * Convert LatLon to first mesh.
 *
 * @param lat latitude
 * @param lon longitude
 * @returns {string} first mesh
 */
function latLonToFirstMesh(lat: number, lon: number): string {
  const meshLat = parseInt(lat * 1.5).toString()
  const meshLon = parseInt(lon - 100).toString()
  return meshLat + meshLon
}

/**
 * Convert LatLon to second mesh.
 *
 * @param lat latitude
 * @param lon longitude
 * @returns {string} second mesh
 */
function latLonToSecondMesh(lat: number, lon: number): string {
  const firstMeshLat = lat * 1.5
  const firstMeshLon = lon - 100

  const meshLat = `${parseInt((firstMeshLat - parseInt(firstMeshLat)) * 8)}`
  const meshLon = `${parseInt((firstMeshLon - parseInt(firstMeshLon)) * 8)}`
  return `${latLonToFirstMesh(lat, lon)}-${meshLat}${meshLon}`
}

/**
 * Convert LatLon to third mesh.
 *
 * @param lat latitude
 * @param lon longitude
 * @returns {string} third mesh
 */
function latLonToThirdMesh(lat: number, lon: number): string {
  const secondMeshLat = (lat * 1.5 - parseInt(lat * 1.5)) * 8
  const secondMeshLon = (lon - 100 - parseInt(lon - 100)) * 8

  const meshLat = `${parseInt((secondMeshLat - parseInt(secondMeshLat)) * 10)}`
  const meshLon = `${parseInt((secondMeshLon - parseInt(secondMeshLon)) * 10)}`
  return `${latLonToSecondMesh(lat, lon)}-${meshLat}${meshLon}`
}

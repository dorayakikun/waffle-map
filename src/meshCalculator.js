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
  const newMesh = mesh.replace('-', '')

  const len = newMesh.length
  if (len < 4) {
    throw new Error(`Illegal format. mesh is ${mesh}`)
  }
  switch (len) {
    case 4:
      return firstMeshToLatLon(mesh)
    case 6:
      return secondMeshToLatLon(mesh)
    case 8:
      throw new Error(`Not Implemented`)
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
  const secondMeshLat = parseInt(mesh.substr(5, 1))
  const secondMeshLon = parseInt(mesh.substr(6))

  if (isNaN(secondMeshLat) || isNaN(secondMeshLon)) {
    throw new Error(`Illegal format. mesh is ${mesh}`)
  }

  return {
    lat: firstMeshLatLon.lat + secondMeshLat / 8 + 1 / 12,
    lon: firstMeshLatLon.lon + secondMeshLon / 8 + 1 / 8
  }
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

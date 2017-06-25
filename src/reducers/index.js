// @flow
import { meshToLatLon, meshToBounds } from '../meshCalculator'
import { INPUT_MESHES } from '../actions/meshInput'

import type { Bounds, LatLon } from '../meshCalculator'
import type { State, Action } from '../types'

const initialState: State = {
  meshes: '',
  centerCoords: [],
  boundsArray: []
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case INPUT_MESHES:
      return Object.assign({}, state, {
        meshes: action.payload,
        centerCoords: [meshToLatLonOr(action.payload)],
        boundsArray: [meshToBoundsOr(action.payload)]
      })
    default:
      return state
  }
}

/**
 * Convert mesh to LatLon.
 * If mesh is invalid then return invalid LatLon.
 *
 * @param mesh mesh
 * @returns {LatLon} Latitude and Longitude
 */
const meshToLatLonOr = (mesh: string) => {
  try {
    return meshToLatLon(mesh)
  } catch (e) {
    return { lat: -999, lon: -999 }
  }
}

/**
 * Convert mesh to bounds.
 * If mesh is invalid then return empty array.
 *
 * @param mesh
 * @returns {Bounds}
 */
const meshToBoundsOr = (mesh: string) => {
  try {
    return meshToBounds(mesh)
  } catch (e) {
    return [[], []]
  }
}

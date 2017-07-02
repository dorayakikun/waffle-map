// @flow
import { meshToBounds, meshToLatLon } from '../meshCalculator'
import * as AppActions from '../actions/AppActions'

import type { Action } from '../actions/AppActions'
import type { Bounds, LatLon } from '../meshCalculator'

export type MeshInputState = {
  meshesString: string,
  separator: string
}

export type Mesh = {
  code: string,
  center: LatLon,
  bounds: Bounds
}

export type State = {
  meshInput: MeshInputState,
  meshes: Array<Mesh>
}

const initialState: State = {
  meshInput: {
    meshesString: '',
    separator: '.'
  },
  meshes: []
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case AppActions.INPUT_MESHES:
      const { meshesString } = action.payload
      return {
        ...state,
        meshes: meshesToBoundsArray(meshesString, state),
        meshInput: {
          ...state.meshInput,
          meshesString
        }
      }
    case AppActions.SELECT_SEPARATOR:
      const { separator } = action.payload
      return {
        ...state,
        meshInput: {
          ...state.meshInput,
          separator
        }
      }
    default:
      return state
  }
}

/**
 * Convert meshes to boundsArray.
 * If mesh is invalid then return previous boundsArray.
 *
 * @param meshes
 * @param state
 * @returns {Array<Bounds>}
 */
const meshesToBoundsArray = (meshes: string, state: State): Array<Mesh> => {
  const { separator } = state.meshInput
  try {
    return meshes.split(separator).filter(mesh => mesh !== '').map(mesh => {
      return {
        code: mesh,
        center: meshToLatLon(mesh),
        bounds: meshToBounds(mesh)
      }
    })
  } catch (e) {
    return state.meshes
  }
}

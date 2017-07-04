// @flow
import { meshToBounds, meshToLatLng } from '../MeshCalculator'
import * as AppActions from '../actions/AppActions'

import type { Action } from '../actions/AppActions'
import type { Bounds, LatLng } from '../MeshCalculator'

export type MeshInputState = {
  meshesString: string,
  separator: string
}

export type Mesh = {
  code: string,
  center: LatLng,
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
        meshes: meshesFrom(meshesString, state),
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
 * @param meshesString
 * @param state
 * @returns {Array<Bounds>}
 */
const meshesFrom = (meshesString: string, state: State): Array<Mesh> => {
  const { separator } = state.meshInput
  try {
    return meshesString
      .split(separator)
      .filter(mesh => mesh !== '')
      .map(mesh => {
        return {
          code: mesh,
          center: meshToLatLng(mesh),
          bounds: meshToBounds(mesh)
        }
      })
  } catch (e) {
    return state.meshes
  }
}

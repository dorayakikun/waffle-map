// @flow
import { meshToBounds } from '../meshCalculator'
import * as AppActions from '../actions/AppActions'

import type { State as MapState } from './map'
import type { State as MeshInputState } from './meshInput'
import type { Action } from '../actions/AppActions'
import type { Bounds } from '../meshCalculator'

export type State = {
  map: MapState,
  meshInput: MeshInputState
}

const initialState: State = {
  map: { boundsArray: [] },
  meshInput: {
    meshes: '',
    separator: ''
  }
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case AppActions.INPUT_MESHES:
      const { meshes } = action.payload
      return {
        ...state,
        map: { boundsArray: meshesToBoundsOr(meshes) },
        meshInput: {
          ...state.meshInput,
          meshes
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
 * Convert meshes to bounds.
 * If mesh is invalid then return empty array.
 *
 * @param meshes
 * @returns {Bounds}
 */
const meshesToBoundsOr = (meshes: string): Array<Bounds> => {
  try {
    return meshToBounds(meshes)
  } catch (e) {
    return []
  }
}

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
    separator: '.'
  }
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case AppActions.INPUT_MESHES:
      const { meshes } = action.payload
      return {
        ...state,
        map: { boundsArray: meshesToBoundsArray(meshes, state) },
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
 * Convert meshes to boundsArray.
 * If mesh is invalid then return previous boundsArray.
 *
 * @param meshes
 * @param state
 * @returns {Array<Bounds>}
 */
const meshesToBoundsArray = (meshes: string, state: State): Array<Bounds> => {
  const { separator } = state.meshInput
  try {
    return meshes
      .split(separator)
      .filter(mesh => mesh !== '')
      .map(mesh => meshToBounds(mesh))
  } catch (e) {
    return state.map.boundsArray
  }
}

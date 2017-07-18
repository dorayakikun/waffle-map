// @flow
import meshCalculator from '../domain/calculateMesh'
import * as AppActions from '../actions/AppActions'

import type { Action } from '../actions/AppActions'
import type { LatLng, Mesh } from '../domain/calculateMesh'

export type MeshInputState = {
  errorMessage: string,
  meshCodes: string,
  separator: string
}

export type MapState = {
  contextmenuPosition: ?LatLng
}

export type State = {
  meshInput: MeshInputState,
  meshes: Array<Mesh>,
  map: MapState
}
const { meshToBounds, meshToLatLng } = meshCalculator
const initialState: State = {
  meshInput: {
    errorMessage: '',
    meshCodes: '',
    separator: '.'
  },
  meshes: [],
  map: {
    contextmenuPosition: null
  }
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case AppActions.INPUT_MESHES:
      const { meshCodes } = action.payload
      return stateFrom(meshCodes, state)
    case AppActions.SELECT_SEPARATOR:
      const { separator } = action.payload
      return {
        ...state,
        meshInput: {
          ...state.meshInput,
          separator
        }
      }
    case AppActions.UPDATE_CONTEXTMENU_POSITION:
      const { latLng } = action.payload
      return {
        ...state,
        map: {
          contextmenuPosition: latLng
        }
      }
    default:
      return state
  }
}

/**
 * Create state from meshCodes.
 * If meshCodes are invalid then return previous state(with an error message).
 *
 * @param {string} meshCodes
 * @param {State} state
 * @returns {State}
 */
const stateFrom = (meshCodes: string, state: State): State => {
  const { separator } = state.meshInput
  try {
    return {
      ...state,
      meshInput: {
        ...state.meshInput,
        errorMessage: '',
        meshCodes: meshCodes
      },
      meshes: meshCodes
        .split(separator)
        .filter(mesh => mesh !== '')
        .map(mesh => {
          return {
            code: mesh,
            center: meshToLatLng(mesh),
            bounds: meshToBounds(mesh)
          }
        })
    }
  } catch (e) {
    return {
      ...state,
      meshInput: {
        ...state.meshInput,
        errorMessage: e.message,
        meshCodes: meshCodes
      }
    }
  }
}

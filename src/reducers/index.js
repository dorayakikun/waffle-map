// @flow
import { meshToBounds, meshToLatLng } from 'waffle-map-mesh-calculator-basic'
import * as AppActions from '../actions/AppActions'

import type { Action } from '../actions/AppActions'
import type { Bounds, LatLng } from 'waffle-map-mesh-calculator-basic'

export type MeshInputState = {
  errorMessage: string,
  meshesString: string,
  separator: string
}

export type Mesh = {
  code: string,
  center: LatLng,
  bounds: Bounds
}

export type MapState = {
  contextmenuPosition: ?LatLng
}

export type State = {
  meshInput: MeshInputState,
  meshes: Array<Mesh>,
  map: MapState
}

const initialState: State = {
  meshInput: {
    errorMessage: '',
    meshesString: '',
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
      const { meshesString } = action.payload
      return stateFrom(meshesString, state)
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
 * @param meshCodes
 * @param state
 * @returns {Array<Bounds>}
 */
const stateFrom = (meshCodes: string, state: State): State => {
  const { separator } = state.meshInput
  try {
    return {
      ...state,
      meshInput: {
        ...state.meshInput,
        errorMessage: '',
        meshesString: meshCodes
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
    console.log('Waffle Map Error: \n', e.message)
    return {
      ...state,
      meshInput: {
        ...state.meshInput,
        errorMessage: e.message,
        meshesString: meshCodes
      }
    }
  }
}

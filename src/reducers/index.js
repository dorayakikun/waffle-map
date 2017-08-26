// @flow
import meshCalculator from '../domain/calculateMesh'
import { convertToMillisecLatLng } from '../domain/convertLatLng'
import * as AppActions from '../actions/AppActions'

import type { Action } from '../actions/AppActions'
import type { LatLng, Mesh } from '../domain/calculateMesh'

type MarkerInputState = {
  errorMessage: string,
  markerPositions: Array<LatLng>
}

export type MeshInputState = {
  errorMessage: string,
  meshCodes: string,
  separator: string
}

export type TileToggleState = {
  isShowDebugTiles: boolean
}

export type MapState = {
  contextmenuPosition: ?LatLng
}

export type State = {
  markerInput: MarkerInputState,
  meshInput: MeshInputState,
  tileToggle: TileToggleState,
  meshes: Array<Mesh>,
  map: MapState
}
const { meshToBounds, meshToLatLng } = meshCalculator
const initialState: State = {
  markerInput: {
    errorMessage: '',
    markerPositions: []
  },
  meshInput: {
    errorMessage: '',
    meshCodes: '',
    separator: '.'
  },
  tileToggle: {
    isShowDebugTiles: false
  },
  meshes: [],
  map: {
    contextmenuPosition: null
  }
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case AppActions.PUT_MARKER:
      return concatMarkerPositions(
        state,
        action.payload.latLng,
        action.payload.unit
      )
    case AppActions.REMOVE_ALL_MARKERS:
      return {
        ...state,
        markerInput: {
          ...state.markerInput,
          markerPositions: []
        }
      }
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
    case AppActions.TOGGLE_DEBUG_TILES:
      const { isShowDebugTiles } = action.payload
      return {
        ...state,
        tileToggle: {
          isShowDebugTiles
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

const concatMarkerPositions = (
  state: State,
  latLng: string,
  unit: string
): LatLng => {
  try {
    return {
      ...state,
      markerInput: {
        markerPositions: [
          ...state.markerInput.markerPositions,
          convertToMillisecLatLng(latLng, unit)
        ],
        errorMessage: ''
      }
    }
  } catch (e) {
    return {
      ...state,
      markerInput: {
        markerPositions: [...state.markerInput.markerPositions],
        errorMessage: e.message
      }
    }
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

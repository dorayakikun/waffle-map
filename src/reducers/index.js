// @flow
import meshCalculator from '../domain/calculateMesh'
import {
  convertToMillisecLatLng,
  convertLatLngToTokyoDatum
} from '../domain/convertLatLng'
import * as AppActions from '../actions/AppActions'

import type { Action } from '../actions/AppActions'
import type { LatLng, Mesh } from '../domain/calculateMesh'

type MarkerInputState = {
  latLng: string,
  unit: string,
  errorMessage: string
}

export type MeshInputState = {
  errorMessage: string,
  meshCodes: string,
  datum: string,
  separator: string
}

export type TileToggleState = {
  isShowDebugTiles: boolean
}

export type MapState = {
  contextmenuPosition: ?LatLng,
  markerPositions: Array<LatLng>
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
    latLng: '',
    unit: 'degree',
    errorMessage: ''
  },
  meshInput: {
    errorMessage: '',
    meshCodes: '',
    datum: 'WGS84',
    separator: '.'
  },
  tileToggle: {
    isShowDebugTiles: false
  },
  meshes: [],
  map: {
    contextmenuPosition: null,
    markerPositions: []
  }
}

const concatMarkerPositions = (
  state: State,
  latLng: string,
  unit: string
): State => {
  try {
    return {
      ...state,
      markerInput: {
        latLng,
        unit,
        errorMessage: ''
      },
      map: {
        ...state.map,
        markerPositions: [
          ...state.map.markerPositions,
          convertToMillisecLatLng(latLng, unit)
        ]
      }
    }
  } catch (e) {
    return {
      ...state,
      markerInput: {
        latLng,
        unit,
        errorMessage: e.message
      }
    }
  }
}

const applyDatumToLatLng = (latLng: ?LatLng, datum: string): ?LatLng => {
  if (latLng == null) {
    return latLng
  }
  if (datum == 'Tokyo') {
    return convertLatLngToTokyoDatum(latLng)
  }
  return latLng
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
        .filter(meshCode => meshCode !== '')
        .map(meshCode => {
          return {
            code: meshCode,
            center: meshToLatLng(meshCode),
            bounds: meshToBounds(meshCode)
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
        map: {
          ...state.map,
          markerPositions: []
        }
      }
    case AppActions.INPUT_MESHES:
      const { meshCodes } = action.payload
      return stateFrom(meshCodes, state)
    case AppActions.SELECT_DATUM:
      const { datum } = action.payload
      return {
        ...state,
        meshInput: {
          ...state.meshInput,
          datum
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
          ...state.map,
          contextmenuPosition: latLng
        }
      }
    default:
      return state
  }
}

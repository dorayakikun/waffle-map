import * as AppActions from '../actions/AppActions'
import meshCalculator, { LatLng, Mesh } from '../domain/calculateMesh'
import { createLatLng } from '../domain/convertLatLng'

interface MarkerInputState {
  latLng: string,
  unit: string,
  errorMessage: string,
}

export interface MeshInputState {
  errorMessage: string,
  meshCodes: string,
  datum: string,
  separator: string,
}

export interface TileToggleState {
  isShowDebugTiles: boolean,
}

export interface MeshToggleState {
  isShowMeshes: boolean,
}

export interface MapState {
  contextmenuPosition?:LatLng,
  markerPositions: LatLng[],
}

export interface State {
  markerInput: MarkerInputState,
  meshInput: MeshInputState,
  tileToggle: TileToggleState,
  meshToggle: MeshToggleState,
  meshes: Mesh[],
  map: MapState,
}
const { toBounds, toCenterLatLng } = meshCalculator
const initialState: State = {
  markerInput: {
    latLng: '',
    unit: 'degree',
    errorMessage: '',
  },
  meshInput: {
    errorMessage: '',
    meshCodes: '',
    datum: 'WGS84',
    separator: '.',
  },
  tileToggle: {
    isShowDebugTiles: false,
  },
  meshToggle: {
    isShowMeshes: false,
  },
  meshes: [],
  map: {
    contextmenuPosition: undefined,
    markerPositions: [],
  },
}

const concatMarkerPositions = (state: State, latLng: string): State => {
  const { unit } = state.markerInput
  const markerPositions = state.map.markerPositions
  try {
    return {
      ...state,
      markerInput: { ...state.markerInput, latLng, errorMessage: '' },
      map: {
        ...state.map,
        markerPositions: [...markerPositions, createLatLng(latLng, unit)],
      },
    }
  } catch (e) {
    return {
      ...state,
      markerInput: { ...state.markerInput, latLng, errorMessage: e.message },
    }
  }
}

const removeAllMarkers = (state: State): State => ({
  ...state,
  map: { ...state.map, markerPositions: [] },
})

const changeUnit = (state: State, unit: string) => ({
  ...state,
  markerInput: { ...state.markerInput, unit },
})

const mapToMeshes = (meshCodes: string, separator: string): Mesh[] =>
  meshCodes
    .split(separator)
    .filter(meshCode => meshCode !== '')
    .map(meshCode => {
      return {
        code: meshCode,
        center: toCenterLatLng(meshCode),
        bounds: toBounds(meshCode),
      }
    })

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
      meshInput: { ...state.meshInput, errorMessage: '', meshCodes: meshCodes },
      meshes: mapToMeshes(meshCodes, separator),
    }
  } catch (e) {
    return {
      ...state,
      meshInput: {
        ...state.meshInput,
        errorMessage: e.message,
        meshCodes: meshCodes,
      },
    }
  }
}

const selectDatum = (state: State, datum: string): State => ({
  ...state,
  meshInput: { ...state.meshInput, datum },
})

const selectSeparator = (state: State, separator: string): State => ({
  ...state,
  meshInput: { ...state.meshInput, separator },
})

const toggleGrid = (state: State, type: any, isShow: boolean): State => {
  switch (type) {
    case AppActions.TOGGLE_DEBUG_TILES:
      return {
        ...state,
        tileToggle: { isShowDebugTiles: isShow },
      }
    case AppActions.TOGGLE_MESHES:
      return {
        ...state,
        meshToggle: { isShowMeshes: isShow },
      }
    default:
      return state
  }
}

const updateContextmenuPosition = (state: State, latLng?: LatLng): State => ({
  ...state,
  map: { ...state.map, contextmenuPosition: latLng },
})

export const reducers =  (state: State = initialState, action: AppActions.Action): State => {
  switch (action.type) {
    case AppActions.PUT_MARKER:
      return concatMarkerPositions(state, action.payload.latLng)
    case AppActions.REMOVE_ALL_MARKERS:
      return removeAllMarkers(state)
    case AppActions.CHANGE_UNIT:
      return changeUnit(state, action.payload.unit)
    case AppActions.INPUT_MESHES:
      const { meshCodes } = action.payload
      return stateFrom(meshCodes, state)
    case AppActions.SELECT_DATUM:
      const { datum } = action.payload
      return selectDatum(state, datum)
    case AppActions.SELECT_SEPARATOR:
      const { separator } = action.payload
      return selectSeparator(state, separator)
    case AppActions.TOGGLE_DEBUG_TILES:
      const { isShowDebugTiles } = action.payload
      return toggleGrid(state, action.type, isShowDebugTiles)
    case AppActions.TOGGLE_MESHES:
      const { isShowMeshes } = action.payload
      return toggleGrid(state, action.type, isShowMeshes)
    case AppActions.UPDATE_CONTEXTMENU_POSITION:
      const { latLng } = action.payload
      return updateContextmenuPosition(state, latLng)
    default:
      return state
  }
}
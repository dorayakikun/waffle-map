import { Action, ActionKeys } from '../actions/AppActions'
import meshCalculator, { LatLng, Mesh } from '../domain/calculateMesh'
import { createLatLng } from '../domain/convertLatLng'

interface GeodeticInputState {
  unit: string
  datum: string
}
interface MarkerInputState {
  latLng: string
  errorMessage: string
}

export interface MeshInputState {
  errorMessage: string
  meshCodes: string
  separator: string
}

export interface TileToggleState {
  isShowDebugTiles: boolean
}

export interface MeshToggleState {
  isShowMeshes: boolean
}

export interface MapState {
  contextmenuPosition?: LatLng
  markerPositions: LatLng[]
}

export interface State {
  geodeticInput: GeodeticInputState
  markerInput: MarkerInputState
  meshInput: MeshInputState
  tileToggle: TileToggleState
  meshToggle: MeshToggleState
  meshes: Mesh[]
  map: MapState
}
const { toBounds, toCenterLatLng } = meshCalculator
export const initialState: State = {
  geodeticInput: {
    datum: 'WGS84',
    unit: 'degree',
  },
  map: {
    contextmenuPosition: undefined,
    markerPositions: [],
  },
  markerInput: {
    errorMessage: '',
    latLng: '',
  },
  meshInput: {
    errorMessage: '',
    meshCodes: '',
    separator: '.',
  },
  meshToggle: {
    isShowMeshes: false,
  },
  meshes: [],
  tileToggle: {
    isShowDebugTiles: false,
  },
}

const concatMarkerPositions = (state: State, latLng: string): State => {
  const { unit } = state.geodeticInput
  const markerPositions = state.map.markerPositions
  try {
    return {
      ...state,
      map: {
        ...state.map,
        markerPositions: [...markerPositions, createLatLng(latLng, unit)],
      },
      markerInput: { ...state.markerInput, latLng, errorMessage: '' },
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
  geodeticInput: { ...state.geodeticInput, unit },
})

const mapToMeshes = (meshCodes: string, separator: string): Mesh[] =>
  meshCodes
    .split(separator)
    .filter(meshCode => meshCode !== '')
    .map(meshCode => {
      return {
        bounds: toBounds(meshCode),
        center: toCenterLatLng(meshCode),
        code: meshCode,
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
      meshInput: { ...state.meshInput, errorMessage: '', meshCodes },
      meshes: mapToMeshes(meshCodes, separator),
    }
  } catch (e) {
    return {
      ...state,
      meshInput: {
        ...state.meshInput,
        errorMessage: e.message,
        meshCodes,
      },
    }
  }
}

const selectDatum = (state: State, datum: string): State => ({
  ...state,
  geodeticInput: { ...state.geodeticInput, datum },
})

const selectSeparator = (state: State, separator: string): State => ({
  ...state,
  meshInput: { ...state.meshInput, separator },
})

const toggleGrid = (state: State, type: any, isShow: boolean): State => {
  switch (type) {
    case ActionKeys.TOGGLE_DEBUG_TILES:
      return {
        ...state,
        tileToggle: { isShowDebugTiles: isShow },
      }
    case ActionKeys.TOGGLE_MESHES:
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

export const reducers = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case ActionKeys.PUT_MARKER:
      return concatMarkerPositions(state, action.payload.latLng)
    case ActionKeys.REMOVE_ALL_MARKERS:
      return removeAllMarkers(state)
    case ActionKeys.CHANGE_UNIT:
      return changeUnit(state, action.payload.unit)
    case ActionKeys.INPUT_MESHES:
      const { meshCodes } = action.payload
      return stateFrom(meshCodes, state)
    case ActionKeys.SELECT_DATUM:
      const { datum } = action.payload
      return selectDatum(state, datum)
    case ActionKeys.SELECT_SEPARATOR:
      const { separator } = action.payload
      return selectSeparator(state, separator)
    case ActionKeys.TOGGLE_DEBUG_TILES:
      const { isShowDebugTiles } = action.payload
      return toggleGrid(state, action.type, isShowDebugTiles)
    case ActionKeys.TOGGLE_MESHES:
      const { isShowMeshes } = action.payload
      return toggleGrid(state, action.type, isShowMeshes)
    case ActionKeys.UPDATE_CONTEXTMENU_POSITION:
      const { latLng } = action.payload
      return updateContextmenuPosition(state, latLng)
    case ActionKeys.INPUT_MESH_CODES:
      const mc = action.payload.meshCodes
      console.log(`meshCodes: ${mc}`)
      return {...state, meshInput: { ...state.meshInput, meshCodes: mc }}
    case ActionKeys.CREATE_MESHES:
      return { ...state, meshes: mapToMeshes(action.payload.meshCodes, action.payload.separator)}
    default:
      return state
  }
}

export const getMeshCodesInput = (state: State) => state.meshInput
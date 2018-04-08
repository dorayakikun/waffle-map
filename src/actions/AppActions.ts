import { LatLng } from '../domain/calculateMesh'

export enum ActionKeys {
  PUT_MARKER = 'PUT_MARKER',
  REMOVE_ALL_MARKERS = 'REMOVE_ALL_MARKERS',
  CHANGE_UNIT = 'CHANGE_UNIT',
  INPUT_MESHES = 'INPUT_MESHES',
  SELECT_DATUM = 'SELECT_DATUM',
  SELECT_SEPARATOR = 'SELECT_SEPARATOR',
  TOGGLE_DEBUG_TILES = 'TOGGLE_DEBUG_TILES',
  TOGGLE_MESHES = 'TOGGLE_MESHES',
  UPDATE_CONTEXTMENU_POSITION = 'UPDATE_CONTEXTMENU_POSITION',
}

interface PutMarkerAction {
  readonly type: ActionKeys.PUT_MARKER
  payload: { latLng: string }
}
interface RemoveAllMarkerAction {
  readonly type: ActionKeys.REMOVE_ALL_MARKERS
}
interface ChangeUnitAction {
  readonly type: ActionKeys.CHANGE_UNIT
  payload: { unit: string }
}
interface InputMeshesAction {
  readonly type: ActionKeys.INPUT_MESHES
  payload: { meshCodes: string }
}
interface SelectDatumAction {
  readonly type: ActionKeys.SELECT_DATUM
  payload: { datum: string }
}
interface SelectSeparatorAction {
  type: ActionKeys.SELECT_SEPARATOR
  payload: { separator: string }
}
interface ToggleDebugTilesAction {
  readonly type: ActionKeys.TOGGLE_DEBUG_TILES
  payload: { isShowDebugTiles: boolean }
}
interface ToggleMeshesAction {
  type: ActionKeys.TOGGLE_MESHES
  payload: { isShowMeshes: boolean }
}
interface UpdateContextmenuPositionAction {
  type: ActionKeys.UPDATE_CONTEXTMENU_POSITION
  payload: { latLng?: LatLng }
}

export type Action =
  | PutMarkerAction
  | RemoveAllMarkerAction
  | ChangeUnitAction
  | InputMeshesAction
  | SelectDatumAction
  | SelectSeparatorAction
  | ToggleDebugTilesAction
  | ToggleMeshesAction
  | UpdateContextmenuPositionAction

export const putMarker = (latLng: string): PutMarkerAction => ({
  payload: { latLng },
  type: ActionKeys.PUT_MARKER,
})

export const removeAllMarkers = (): RemoveAllMarkerAction => ({
  type: ActionKeys.REMOVE_ALL_MARKERS,
})

export const changeUnit = (unit: string): ChangeUnitAction => ({
  payload: { unit },
  type: ActionKeys.CHANGE_UNIT,
})

export const inputMeshes = (meshCodes: string): InputMeshesAction => ({
  payload: { meshCodes },
  type: ActionKeys.INPUT_MESHES,
})

export const selectDatum = (datum: string): SelectDatumAction => ({
  payload: { datum },
  type: ActionKeys.SELECT_DATUM,
})

export const selectSeparator = (separator: string): SelectSeparatorAction => ({
  payload: { separator },
  type: ActionKeys.SELECT_SEPARATOR,
})

export const toggleDebugTiles = (
  isShowDebugTiles: boolean
): ToggleDebugTilesAction => ({
  payload: { isShowDebugTiles },
  type: ActionKeys.TOGGLE_DEBUG_TILES,
})

export const toggleMeshes = (isShowMeshes: boolean): ToggleMeshesAction => ({
  payload: { isShowMeshes },
  type: ActionKeys.TOGGLE_MESHES,
})

export const updateContextmenuPosition = (
  latLng?: LatLng
): UpdateContextmenuPositionAction => ({
  payload: { latLng },
  type: ActionKeys.UPDATE_CONTEXTMENU_POSITION,
})

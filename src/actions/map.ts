import { LatLng } from '../domain/calculateMesh'

export enum ActionKeys {
  PUT_MARKER = 'map/put_marker',
  UPDATE_MARKER_POSITIONS = 'map/update_marker_positions',
  REMOVE_ALL_MARKERS = 'map/remove_all_markers',
  UPDATE_CONTEXTMENU_POSITION = 'map/update_contextmenu_position',
}

interface PutMarkerAction {
  readonly type: ActionKeys.PUT_MARKER
}
interface UpdateMarkerPositionsAction {
  readonly type: ActionKeys.UPDATE_MARKER_POSITIONS
  payload: { markerPositions: LatLng[] }
}
interface RemoveAllMarkerAction {
  readonly type: ActionKeys.REMOVE_ALL_MARKERS
}
interface UpdateContextmenuPositionAction {
  readonly type: ActionKeys.UPDATE_CONTEXTMENU_POSITION
  payload: { latLng?: LatLng }
}

export type Action =
  | PutMarkerAction
  | UpdateMarkerPositionsAction
  | RemoveAllMarkerAction
  | UpdateContextmenuPositionAction

export const putMarker = (latLng: string): PutMarkerAction => ({
  type: ActionKeys.PUT_MARKER,
})

export const updateMarkerPositions = (
  markerPositions: LatLng[]
): UpdateMarkerPositionsAction => ({
  payload: { markerPositions },
  type: ActionKeys.UPDATE_MARKER_POSITIONS,
})

export const removeAllMarkers = (): RemoveAllMarkerAction => ({
  type: ActionKeys.REMOVE_ALL_MARKERS,
})

export const updateContextmenuPosition = (
  latLng?: LatLng
): UpdateContextmenuPositionAction => ({
  payload: { latLng },
  type: ActionKeys.UPDATE_CONTEXTMENU_POSITION,
})

export enum ActionKeys {
  CHANGE_ERROR_MESSAGE = 'marker/change_error_message',
  INPUT_LAT_LNG = 'marker/input_lat_lng',
  PUT_MARKER = 'marker/put_marker',
  REMOVE_ALL_MARKERS = 'marker/remove_all_markers',
}

interface ChangeErrorMessageAction {
  readonly type: ActionKeys.CHANGE_ERROR_MESSAGE
  payload: { errorMessage: string }
}

interface InputLatLngAction {
  readonly type: ActionKeys.INPUT_LAT_LNG
  payload: { latLng: string }
}

export interface PutMarkerAction {
  readonly type: ActionKeys.PUT_MARKER
  payload: { latLng: string }
}

interface RemoveAllMarkerAction {
  readonly type: ActionKeys.REMOVE_ALL_MARKERS
}

export type Action =
  | ChangeErrorMessageAction
  | InputLatLngAction
  | PutMarkerAction

export const changeErrorMessage = (
  errorMessage: string
): ChangeErrorMessageAction => ({
  payload: { errorMessage },
  type: ActionKeys.CHANGE_ERROR_MESSAGE,
})

export const inputLatLng = (latLng: string): InputLatLngAction => ({
  payload: { latLng },
  type: ActionKeys.INPUT_LAT_LNG,
})

export const putMarker = (latLng: string): PutMarkerAction => ({
  payload: { latLng },
  type: ActionKeys.PUT_MARKER,
})

export const removeAllMarkers = (): RemoveAllMarkerAction => ({
  type: ActionKeys.REMOVE_ALL_MARKERS,
})

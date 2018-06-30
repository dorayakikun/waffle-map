import { Action, ActionKeys } from '../actions/map'
import { LatLng } from '../domain/calculateMesh'

export interface State {
  contextmenuPosition?: LatLng
  markerPositions: LatLng[]
}

const updateMarkerPositions = (
  state: State,
  markerPositions: LatLng[]
): State => ({
  ...state,
  markerPositions,
})

const removeAllMarkers = (state: State): State => ({
  ...state,
  markerPositions: [],
})

const updateContextmenuPosition = (state: State, latLng?: LatLng): State => ({
  ...state,
  contextmenuPosition: latLng,
})

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionKeys.PUT_MARKER:
      return state // TODO saga ハンドル用 引数はいらない
    case ActionKeys.UPDATE_MARKER_POSITIONS:
      return updateMarkerPositions(state, action.payload.markerPositions)
    case ActionKeys.REMOVE_ALL_MARKERS:
      return removeAllMarkers(state)
    case ActionKeys.UPDATE_CONTEXTMENU_POSITION:
      const { latLng } = action.payload
      return updateContextmenuPosition(state, latLng)
    default:
      return state
  }
}

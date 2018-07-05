import { Action, ActionKeys } from '../actions/map'
import { LatLng } from '../domain/calculateMesh'

export interface State {
  contextmenuPosition?: LatLng
  markerPositions: LatLng[]
}

export const initialState: State = {
  contextmenuPosition: undefined,
  markerPositions: [],
}

const concatMarkerPositions = (state: State, position: LatLng): State => ({
  ...state,
  markerPositions: [...state.markerPositions, position],
})

const removeAllMarkers = (state: State): State => ({
  ...state,
  markerPositions: [],
})

const updateContextmenuPosition = (state: State, latLng?: LatLng): State => ({
  ...state,
  contextmenuPosition: latLng,
})

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionKeys.CONCAT_MARKER_POSITIONS:
      return concatMarkerPositions(state, action.payload.position)
    case ActionKeys.REMOVE_ALL_MARKERS:
      return removeAllMarkers(state)
    case ActionKeys.UPDATE_CONTEXTMENU_POSITION:
      const { latLng } = action.payload
      return updateContextmenuPosition(state, latLng)
    default:
      return state
  }
}

import { Action, ActionKeys } from '../actions/markers'

export interface State {
  latLng: string
  errorMessage: string
}

export const initialState: State = {
  errorMessage: '',
  latLng: '',
}

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionKeys.CHANGE_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload.errorMessage }
    case ActionKeys.INPUT_LAT_LNG:
      return { ...state, latLng: action.payload.latLng }
    default:
      return state
  }
}

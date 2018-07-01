import { Action, ActionKeys } from '../actions/meshGrid'

export interface State {
  isVisible: boolean
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionKeys.TOGGLE_VISIBLE:
      return { ...state, isVisible: action.payload.isVisible }
    default:
      return state
  }
}

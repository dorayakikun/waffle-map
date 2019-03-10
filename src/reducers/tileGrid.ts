import { Action, ActionKeys } from "../actions/tileGrid";

export interface State {
  isVisible: boolean;
}

export const initialState: State = {
  isVisible: false
};
export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionKeys.TOGGLE_VISIBLE:
      return { ...state, isVisible: action.payload.isVisible };
    default:
      return state;
  }
};

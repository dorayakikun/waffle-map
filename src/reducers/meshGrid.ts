import { Action, ActionKeys } from "../actions/meshGrid";

export type State = {
  isVisible: boolean;
};
export const initialState: State = {
  isVisible: false
};
export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionKeys.TOGGLE_VISIBLE:
      return { ...state, isVisible: action.payload.isVisible };
    default:
      return state;
  }
}

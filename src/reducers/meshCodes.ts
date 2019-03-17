import { Action, ActionKeys } from "../actions/meshCodes";

export type State = {
  errorMessage: string;
  meshCodes: string;
  separator: string;
};

export const initialState: State = {
  errorMessage: "",
  meshCodes: "",
  separator: "."
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionKeys.CHANGE_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload.errorMessage };
    case ActionKeys.CHANGE_SEPARATOR:
      return { ...state, separator: action.payload.separator };
    case ActionKeys.INPUT_MESH_CODES:
      return { ...state, meshCodes: action.payload.meshCodes };
    default:
      return state;
  }
}

import { Action, ActionKeys } from "../actions/geodetic";

export type State = {
  unit: string;
  datum: string;
};
export const initialState: State = {
  datum: "WGS84",
  unit: "degree",
};

function changeDatum(state: State, datum: string): State {
  return {
    ...state,
    datum,
  };
}

function changeUnit(state: State, unit: string): State {
  return {
    ...state,
    unit,
  };
}

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionKeys.CHANGE_DATUM:
      return changeDatum(state, action.payload.datum);
    case ActionKeys.CHANGE_UNIT:
      return changeUnit(state, action.payload.unit);
    default:
      return state;
  }
}

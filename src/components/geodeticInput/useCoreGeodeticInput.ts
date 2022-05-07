import { useCallback, useReducer } from "react";

enum ActionKeys {
  CHANGE_DATUM = "geodetic/change_datum",
  CHANGE_UNIT = "geodetic/change_unit",
}

type ChangeDatumAction = {
  readonly type: ActionKeys.CHANGE_DATUM;
  payload: { datum: string };
};
type ChangeUnitAction = {
  readonly type: ActionKeys.CHANGE_UNIT;
  payload: { unit: string };
};

type Action = ChangeDatumAction | ChangeUnitAction;

export type State = {
  unit: string;
  datum: string;
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionKeys.CHANGE_DATUM: {
      const { datum } = action.payload;
      return {
        ...state,
        datum,
      };
    }
    case ActionKeys.CHANGE_UNIT: {
      const { unit } = action.payload;
      return {
        ...state,
        unit,
      };
    }
    default:
      return state;
  }
}

const initialStateFactory = (initialState?: Partial<State>): State => ({
  datum: "WGS84",
  unit: "degree",
  ...initialState,
});

export const useCoreGeodeticInput = (initialState?: Partial<State>) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialStateFactory(initialState),
  );

  const changeDatum = useCallback(
    (datum: string) => {
      dispatch({
        type: ActionKeys.CHANGE_DATUM,
        payload: { datum },
      });
    },
    [dispatch],
  );

  const changeUnit = useCallback(
    (unit: string) => {
      dispatch({
        type: ActionKeys.CHANGE_UNIT,
        payload: { unit },
      });
    },
    [dispatch],
  );

  return {
    state,
    changeDatum,
    changeUnit,
  };
};

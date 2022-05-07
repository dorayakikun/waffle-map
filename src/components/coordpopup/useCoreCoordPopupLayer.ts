import { useCallback, useReducer } from "react";
import { LatLng } from "../../domain/calculateMesh";

enum ActionKeys {
  SET_POSITION = "coord_popup/set_position",
}

type SetPosition = {
  type: ActionKeys.SET_POSITION;
  payload: { position: LatLng };
};

type Action = SetPosition;

export type State = {
  position?: LatLng;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionKeys.SET_POSITION: {
      const { position } = action.payload;
      return {
        ...state,
        position,
      };
    }
    default:
      return state;
  }
}

const initialStateFactory = (initialState?: Partial<State>): State => ({
  position: undefined,
  ...initialState,
});

export const useCoreCoordPopupLayer = (initialState?: Partial<State>) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialStateFactory(initialState),
  );

  const setPosition = useCallback(
    (position: LatLng) => {
      dispatch({
        type: ActionKeys.SET_POSITION,
        payload: { position },
      });
    },
    [dispatch],
  );

  return {
    state,
    setPosition,
  };
};

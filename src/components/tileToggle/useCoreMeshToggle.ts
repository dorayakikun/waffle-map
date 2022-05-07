import { useCallback, useReducer } from "react";

enum ActionKeys {
  SET_ENABLE_TILE_GRID = "tile_toggle/set_enable_tile_grid",
}

type ToggleVisibleAction = {
  type: ActionKeys.SET_ENABLE_TILE_GRID;
  payload: { enableTileGrid: boolean };
};

type Action = ToggleVisibleAction;

export type State = {
  enableTileGrid: boolean;
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionKeys.SET_ENABLE_TILE_GRID:
      return {
        ...state,
        enableTileGrid: !state.enableTileGrid,
      };
    default:
      return state;
  }
}

const initialStateFactory = (initialState?: Partial<State>): State => ({
  enableTileGrid: false,
  ...initialState,
});

export const useCoreMeshToggle = (initialState?: Partial<State>) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialStateFactory(initialState),
  );

  const setEnableTileGrid = useCallback(
    (enableTileGrid: boolean) => {
      dispatch({
        type: ActionKeys.SET_ENABLE_TILE_GRID,
        payload: { enableTileGrid },
      });
    },
    [dispatch],
  );

  return {
    state,
    setEnableTileGrid,
  };
};

import { useCallback, useReducer } from "react";

enum ActionKeys {
  SET_ENABLE_MESH_GRID = "grid_toggle/set_enable_mesh_grid",
}

type ToggleVisibleAction = {
  type: ActionKeys.SET_ENABLE_MESH_GRID;
  payload: { enableMeshGrid: boolean };
};

type Action = ToggleVisibleAction;

export type State = {
  enableMeshGrid: boolean;
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionKeys.SET_ENABLE_MESH_GRID:
      return {
        ...state,
        enableMeshGrid: action.payload.enableMeshGrid,
      };
    default:
      return state;
  }
}

const initialStateFactory = (initialState?: Partial<State>): State => ({
  enableMeshGrid: false,
  ...initialState,
});

export const useCoreMeshToggle = (initialState?: Partial<State>) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialStateFactory(initialState)
  );

  const setEnableMeshGrid = useCallback(
    (enableMeshGrid: boolean) => {
      dispatch({
        type: ActionKeys.SET_ENABLE_MESH_GRID,
        payload: { enableMeshGrid },
      });
    },
    [dispatch]
  );

  return {
    state,
    setEnableMeshGrid,
  };
};

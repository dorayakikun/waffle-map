import { useCallback, useReducer } from "react";
import { createLatLng } from "../../domain/convertLatLng";
import { LatLng } from "../../domain/calculateMesh";

enum ActionKeys {
  INPUT_LAT_LNG = "marker_input/input_lat_lng",
  PUT_MARKER = "marker_input/put_marker",
  REMOVE_ALL_MARKERS = "marker_input/remove_all_markers",
}

type InputLatLngAction = {
  type: ActionKeys.INPUT_LAT_LNG;
  payload: { latLngString: string };
};

type PutMarkerAction = {
  readonly type: ActionKeys.PUT_MARKER;
  payload: { unit: string };
};

type RemoveAllMarkerAction = {
  readonly type: ActionKeys.REMOVE_ALL_MARKERS;
  payload: {};
};

type Action = InputLatLngAction | PutMarkerAction | RemoveAllMarkerAction;

export type State = {
  latLngString: string;
  errorMessage: string;
  positions: LatLng[];
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionKeys.INPUT_LAT_LNG: {
      const { latLngString } = action.payload;
      return { ...state, latLngString };
    }
    case ActionKeys.PUT_MARKER: {
      const { unit } = action.payload;
      try {
        return {
          ...state,
          errorMessage: "",
          positions: [
            ...state.positions,
            createLatLng(state.latLngString, unit),
          ],
        };
      } catch (e) {
        return {
          ...state,
          errorMessage: e.message,
        };
      }
    }
    case ActionKeys.REMOVE_ALL_MARKERS: {
      return { ...state, positions: [] };
    }
    default:
      return state;
  }
}

const initialStateFactory = (initialState?: Partial<State>): State => ({
  errorMessage: "",
  latLngString: "",
  positions: [],
  ...initialState,
});

export const useCoreMarkerInput = (initialState?: Partial<State>) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialStateFactory(initialState)
  );

  const inputLatLng = useCallback(
    (latLngString: string) => {
      dispatch({
        payload: { latLngString },
        type: ActionKeys.INPUT_LAT_LNG,
      });
    },
    [dispatch]
  );

  const putMarker = useCallback(
    (unit: string) => {
      dispatch({
        payload: { unit },
        type: ActionKeys.PUT_MARKER,
      });
    },
    [dispatch]
  );

  const removeAllMarkers = useCallback(() => {
    dispatch({
      type: ActionKeys.REMOVE_ALL_MARKERS,
      payload: {},
    });
  }, [dispatch]);

  return {
    state,
    inputLatLng,
    putMarker,
    removeAllMarkers,
  };
};

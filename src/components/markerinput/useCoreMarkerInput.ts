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
  payload: { latLng: string };
};

type PutMarkerAction = {
  readonly type: ActionKeys.PUT_MARKER;
  payload: { latLng: string; unit: string };
};

type RemoveAllMarkerAction = {
  readonly type: ActionKeys.REMOVE_ALL_MARKERS;
  payload: {};
};

type Action = InputLatLngAction | PutMarkerAction | RemoveAllMarkerAction;

export type State = {
  latLng: string;
  errorMessage: string;
  positions: LatLng[];
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionKeys.INPUT_LAT_LNG:
      return { ...state, latLng: action.payload.latLng };
    case ActionKeys.PUT_MARKER: {
      const { latLng, unit } = action.payload;
      try {
        return {
          ...state,
          errorMessage: "",
          positions: [...state.positions, createLatLng(latLng, unit)],
        };
      } catch (e) {
        return {
          ...state,
          errorMessage: e.message,
        };
      }
    }
    case ActionKeys.REMOVE_ALL_MARKERS:
      return { ...state, positions: [] };
    default:
      return state;
  }
}

const initialStateFactory = (initialState?: Partial<State>): State => ({
  errorMessage: "",
  latLng: "",
  positions: [],
  ...initialState,
});

export const useCoreMarkerInput = (initialState?: Partial<State>) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialStateFactory(initialState)
  );

  const inputLatLng = useCallback(
    (latLng: string) => ({
      payload: { latLng },
      type: ActionKeys.INPUT_LAT_LNG,
    }),
    [dispatch]
  );

  const putMarker = useCallback(
    (latLng: string, unit: string) => ({
      payload: { latLng, unit },
      type: ActionKeys.PUT_MARKER,
    }),
    [dispatch]
  );

  const removeAllMarkers = useCallback(
    () => ({
      type: ActionKeys.REMOVE_ALL_MARKERS,
      payload: {},
    }),
    [dispatch]
  );

  return {
    state,
    inputLatLng,
    putMarker,
    removeAllMarkers,
  };
};

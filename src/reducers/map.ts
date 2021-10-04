import { Action, ActionKeys } from "../actions/map";
import { LatLng, Mesh } from "../domain/calculateMesh";
import { Datum, LatLngString, Meshcode } from "../types";

type Hoge = {
  userInputMeshes: Record<Datum, Record<Meshcode, Mesh>>;
  meshes: Record<Datum, Record<Meshcode, Mesh>>;
  meshDetails: Record<
    Datum,
    Record<Meshcode, { center: number; bounds: Mesh }>
  >;
  markerPositions: Record<Datum, Record<LatLngString, LatLng>>;
};

export type State = {
  contextmenuPosition?: LatLng;
  markerPositions: LatLng[];
};

export const initialState: State = {
  contextmenuPosition: undefined,
  markerPositions: [],
};

function concatMarkerPositions(state: State, position: LatLng): State {
  return {
    ...state,
    markerPositions: [...state.markerPositions, position],
  };
}

function removeAllMarkers(state: State): State {
  return {
    ...state,
    markerPositions: [],
  };
}

function updateContextmenuPosition(state: State, latLng?: LatLng): State {
  return {
    ...state,
    contextmenuPosition: latLng,
  };
}

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionKeys.CONCAT_MARKER_POSITIONS:
      return concatMarkerPositions(state, action.payload.position);
    case ActionKeys.REMOVE_ALL_MARKERS:
      return removeAllMarkers(state);
    case ActionKeys.UPDATE_CONTEXTMENU_POSITION:
      return updateContextmenuPosition(state, action.payload.latLng);
    default:
      return state;
  }
}

import { createContext, useContext } from "react";

type State = {
  inputLatLng: (latLng: string) => void;
  putMarker: (latLng: string, unit: string) => void;
  removeAllMarkers: () => void;
};

export const MarkerInputDispatchContext = createContext<State | {}>({});
export const useMarkerInputDispatchContext = () => {
  return useContext(MarkerInputDispatchContext) as State;
};

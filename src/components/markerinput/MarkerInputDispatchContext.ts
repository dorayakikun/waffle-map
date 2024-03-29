import { createContext, useContext } from "react";

type State = {
  inputLatLng: (latLng: string) => void;
  putMarker: (unit: string) => void;
  removeAllMarkers: () => void;
};

export const MarkerInputDispatchContext = createContext<State | Record<never, never>>({});
export const useMarkerInputDispatchContext = () => {
  return useContext(MarkerInputDispatchContext) as State;
};

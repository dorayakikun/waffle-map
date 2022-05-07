import { createContext, useContext } from "react";
import { LatLng } from "../../domain/calculateMesh";

type State = {
  setPosition: (position: LatLng) => void;
};

export const CoordPopupLayerDispatchContext = createContext<State | Record<never, never>>({});
export const useCoordPopupLayerDispatchContext = () => {
  return useContext(CoordPopupLayerDispatchContext) as State;
};

import { createContext, useContext } from "react";
import { State } from "./useCoreCoordPopupLayer";

export const CoordPopupLayerStateContext = createContext<State | Record<never, never>>({});

export const useCoordPopupLayerStateContext = () => {
  return useContext(CoordPopupLayerStateContext) as State;
};

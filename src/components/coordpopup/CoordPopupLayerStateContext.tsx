import { createContext, useContext } from "react";
import { State } from "./useCoreCoordPopupLayer";

export const CoordPopupLayerStateContext = createContext<State | {}>({});

export const useCoordPopupLayerStateContext = () => {
  return useContext(CoordPopupLayerStateContext) as State;
};

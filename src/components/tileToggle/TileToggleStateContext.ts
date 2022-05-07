import { createContext, useContext } from "react";
import { State } from "./useCoreMeshToggle";

export const TileToggleStateContext = createContext<State | Record<never, never>>({});
export const useTileToggleStateContext = () => {
  return useContext(TileToggleStateContext) as State;
};

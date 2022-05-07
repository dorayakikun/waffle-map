import { createContext, useContext } from "react";
import { State } from "./useCoreMeshToggle";

export const MeshToggleStateContext = createContext<State | Record<never, never>>({});
export const useMeshToggleStateContext = () => {
  return useContext(MeshToggleStateContext) as State;
};

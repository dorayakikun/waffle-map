import { createContext, useContext } from "react";
import { State } from "./useCoreMarkerInput";

export const MarkerInputStateContext = createContext<State | Record<never, never>>({});
export const useMarkerInputStateContext = () => {
  return useContext(MarkerInputStateContext) as State;
};

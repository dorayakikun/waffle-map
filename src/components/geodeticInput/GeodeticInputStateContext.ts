import { createContext, useContext } from "react";
import { State } from "./useCoreGeodeticInput";

export const GeodeticInputStateContext = createContext<State | Record<never, never>>({});
export const useGeodeticInputStateContext = () => {
  return useContext(GeodeticInputStateContext) as State;
};

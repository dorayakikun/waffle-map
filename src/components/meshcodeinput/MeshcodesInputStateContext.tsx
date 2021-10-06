import { createContext, useContext } from "react";
import { State } from "./useCoreMeshcodesInput";

export const MeshcodesInputStateContext = createContext<State | {}>({});

export const useMeshCodeInputStateContext = () => {
  return useContext(MeshcodesInputStateContext) as State;
};

import { createContext, useContext } from "react";

type State = {
  setEnableMeshGrid: (enableMeshGrid: boolean) => void;
};

export const MeshToggleDispatchContext = createContext<State | Record<never, never>>({});
export const useMeshToggleDispatchContext = () => {
  return useContext(MeshToggleDispatchContext) as State;
};

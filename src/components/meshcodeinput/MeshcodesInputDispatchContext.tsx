import { createContext, useContext } from "react";

type State = {
  inputMeshcodesString: (meshCodes: string) => void;
  changeSeparator: (separator: string) => void;
};

export const MeshcodesInputDispatchContext = createContext<State | Record<never, never>>({});
export const useMeshCodeInputDispatchContext = () => {
  return useContext(MeshcodesInputDispatchContext) as State;
};

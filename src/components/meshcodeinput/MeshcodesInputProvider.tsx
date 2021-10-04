import * as React from "react";
import { State, useCoreMeshcodesInput } from "./useCoreMeshcodesInput";
import { MeshcodesInputStateContext } from "./MeshcodesInputStateContext";
import { MeshcodesInputDispatchContext } from "./MeshcodesInputDispatchContext";

type Props = {
  initialState?: Partial<State>;
};

export const MeshcodesInputProvider = (
  props: React.PropsWithChildren<Props>
) => {
  const { state, inputMeshcodesString, changeSeparator } = useCoreMeshcodesInput(
    props.initialState
  );

  return (
    <MeshcodesInputStateContext.Provider value={state}>
      <MeshcodesInputDispatchContext.Provider
        value={{ inputMeshcodesString, changeSeparator }}
      >
        {props.children}
      </MeshcodesInputDispatchContext.Provider>
    </MeshcodesInputStateContext.Provider>
  );
};

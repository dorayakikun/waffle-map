import * as React from "react";
import { MeshToggleDispatchContext } from "./MeshToggleDispatchContext";
import { MeshToggleStateContext } from "./MeshToggleStateContext";
import { State, useCoreMeshToggle } from "./useCoreMeshToggle";

type Props = {
  initialState?: Partial<State>;
};

export const MeshToggleProvider = (props: React.PropsWithChildren<Props>) => {
  const { state, setEnableMeshGrid } = useCoreMeshToggle(props.initialState);
  return (
    <MeshToggleStateContext.Provider value={state}>
      <MeshToggleDispatchContext.Provider value={{ setEnableMeshGrid }}>
        {props.children}
      </MeshToggleDispatchContext.Provider>
    </MeshToggleStateContext.Provider>
  );
};

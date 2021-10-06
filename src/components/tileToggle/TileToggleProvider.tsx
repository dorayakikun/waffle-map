import * as React from "react";
import { TileToggleDispatchContext } from "./TileToggleDispatchContext";
import { TileToggleStateContext } from "./TileToggleStateContext";
import { State, useCoreMeshToggle } from "./useCoreMeshToggle";

type Props = {
  initialState?: Partial<State>;
};

export const TileToggleProvider = (props: React.PropsWithChildren<Props>) => {
  const { state, setEnableTileGrid } = useCoreMeshToggle(props.initialState);
  return (
    <TileToggleStateContext.Provider value={state}>
      <TileToggleDispatchContext.Provider value={{ setEnableTileGrid }}>
        {props.children}
      </TileToggleDispatchContext.Provider>
    </TileToggleStateContext.Provider>
  );
};

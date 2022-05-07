import * as React from "react";
import { State, useCoreCoordPopupLayer } from "./useCoreCoordPopupLayer";
import { CoordPopupLayerDispatchContext } from "./CoordPopupLayerDispatchContext";
import { CoordPopupLayerStateContext } from "./CoordPopupLayerStateContext";

type Props = {
  initialState?: Partial<State>;
};

export const CoordPopupLayerProvider = (
  props: React.PropsWithChildren<Props>,
) => {
  const { state, setPosition } = useCoreCoordPopupLayer(props.initialState);
  return (
    <CoordPopupLayerStateContext.Provider value={state}>
      <CoordPopupLayerDispatchContext.Provider value={{ setPosition }}>
        {props.children}
      </CoordPopupLayerDispatchContext.Provider>
    </CoordPopupLayerStateContext.Provider>
  );
};

import * as React from "react";
import { State, useCoreMarkerInput } from "./useCoreMarkerInput";
import { MarkerInputDispatchContext } from "./MarkerInputDispatchContext";
import { MarkerInputStateContext } from "./MarkerInputStateContext";
type Props = {
  initialState?: State;
};

export const MarkerInputProvider = (props: React.PropsWithChildren<Props>) => {
  const { state, inputLatLng, putMarker, removeAllMarkers } =
    useCoreMarkerInput(props.initialState);

  return (
    <MarkerInputStateContext.Provider value={state}>
      <MarkerInputDispatchContext.Provider
        value={{ inputLatLng, putMarker, removeAllMarkers }}
      >
        {props.children}
      </MarkerInputDispatchContext.Provider>
    </MarkerInputStateContext.Provider>
  );
};

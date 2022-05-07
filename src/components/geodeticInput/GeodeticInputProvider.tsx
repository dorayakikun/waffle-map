import * as React from "react";
import { GeodeticInputDispatchContext } from "./GeodeticInputDispatchContext";
import { GeodeticInputStateContext } from "./GeodeticInputStateContext";
import { State, useCoreGeodeticInput } from "./useCoreGeodeticInput";

type Props = {
  initialState?: Partial<State>;
};

export const GeodeticInputProvider = (
  props: React.PropsWithChildren<Props>,
) => {
  const { state, changeDatum, changeUnit } = useCoreGeodeticInput(
    props.initialState,
  );

  return (
    <GeodeticInputStateContext.Provider value={state}>
      <GeodeticInputDispatchContext.Provider
        value={{ changeDatum, changeUnit }}
      >
        {props.children}
      </GeodeticInputDispatchContext.Provider>
    </GeodeticInputStateContext.Provider>
  );
};

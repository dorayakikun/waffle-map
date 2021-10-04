import * as React from "react";
import { GeodeticInput } from "./GeodeticInput";
import { useGeodeticInputDispatchContext } from "./GeodeticInputDispatchContext";
import { useGeodeticInputStateContext } from "./GeodeticInputStateContext";

export const GeodeticInputContainer = () => {
  const { datum, unit } = useGeodeticInputStateContext();
  const { changeDatum, changeUnit } = useGeodeticInputDispatchContext();

  const handleDatumChanged = React.useCallback(
    (e: React.SyntheticEvent<HTMLElement>) => {
      changeDatum((e.target as any).value);
    },
    [changeUnit]
  );

  const handleUnitChanged = React.useCallback(
    (e: React.SyntheticEvent<HTMLElement>) => {
      changeUnit((e.target as any).value);
    },
    [changeUnit]
  );

  return (
    <GeodeticInput
      datum={datum}
      unit={unit}
      onDatumChanged={handleDatumChanged}
      onUnitChanged={handleUnitChanged}
    />
  );
};

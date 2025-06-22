import * as React from "react";
import { GeodeticInput } from "./GeodeticInput";
import { useGeodeticInputState, useGeodeticInputActions } from "../../stores/geodeticInputStore";

export const GeodeticInputContainer = () => {
  const { datum, unit } = useGeodeticInputState();
  const { changeDatum, changeUnit } = useGeodeticInputActions();

  const handleDatumChanged = React.useCallback(
    (e: React.SyntheticEvent<HTMLElement>) => {
      changeDatum((e.target as any).value);
    },
    [changeDatum],
  );

  const handleUnitChanged = React.useCallback(
    (e: React.SyntheticEvent<HTMLElement>) => {
      changeUnit((e.target as any).value);
    },
    [changeUnit],
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

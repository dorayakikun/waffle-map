import * as React from "react";
import { GeodeticInput } from "./GeodeticInput";
import { useGeodeticInputState, useGeodeticInputActions } from "../../stores/geodeticInputStore";

export const GeodeticInputContainer = () => {
  const { datum, unit } = useGeodeticInputState();
  const { changeDatum, changeUnit } = useGeodeticInputActions();

  const handleDatumChanged = React.useCallback(
    (value: string) => {
      changeDatum(value);
    },
    [changeDatum],
  );

  const handleUnitChanged = React.useCallback(
    (value: string) => {
      changeUnit(value);
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

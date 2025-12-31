import * as React from "react";
import { useGeodeticInputStore } from "../../stores/useGeodeticInputStore";
import { GeodeticInput } from "./GeodeticInput";

export const GeodeticInputContainer = () => {
  const { datum, unit, changeDatum, changeUnit } = useGeodeticInputStore();

  const handleDatumChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      changeDatum(e.target.value);
    },
    [changeDatum],
  );

  const handleUnitChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      changeUnit(e.target.value);
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

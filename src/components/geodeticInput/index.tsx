import * as React from "react";
import { useGeodeticInputStore } from "../../stores/useGeodeticInputStore";
import { GeodeticInput } from "./GeodeticInput";
import type { Datum, Unit } from "../../types";

export const GeodeticInputContainer = () => {
  const { datum, unit, changeDatum, changeUnit } = useGeodeticInputStore();

  const handleDatumChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      changeDatum(e.target.value as Datum);
    },
    [changeDatum],
  );

  const handleUnitChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      changeUnit(e.target.value as Unit);
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

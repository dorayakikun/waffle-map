import { GeodeticInput } from "./GeodeticInput";
import { 
  useGeodeticInputDatum, 
  useGeodeticInputUnit,
  useGeodeticInputChangeDatum,
  useGeodeticInputChangeUnit
} from "../../stores/geodeticInputStore";
import { Datum, Unit } from "../../types";

export const GeodeticInputContainer = () => {
  const datum = useGeodeticInputDatum();
  const unit = useGeodeticInputUnit();
  const changeDatum = useGeodeticInputChangeDatum();
  const changeUnit = useGeodeticInputChangeUnit();

  const handleDatumChanged = (value: string) => {
    changeDatum(value as Datum);
  };

  const handleUnitChanged = (value: string) => {
    changeUnit(value as Unit);
  };

  return (
    <GeodeticInput
      datum={datum}
      unit={unit}
      onDatumChanged={handleDatumChanged}
      onUnitChanged={handleUnitChanged}
    />
  );
};

import { MarkerInput } from "./MarkerInput";
import { 
  useMarkerInputErrorMessage, 
  useMarkerInputLatLngString,
  useMarkerInputInputLatLng,
  useMarkerInputPutMarker,
  useMarkerInputRemoveAllMarkers
} from "../../stores/markerInputStore";
import { useGeodeticInputUnit } from "../../stores/geodeticInputStore";

type Props = {
  id: string;
};

export function MarkerInputContainer(props: Props) {
  const unit = useGeodeticInputUnit();
  const errorMessage = useMarkerInputErrorMessage();
  const latLngString = useMarkerInputLatLngString();
  const inputLatLng = useMarkerInputInputLatLng();
  const putMarker = useMarkerInputPutMarker();
  const removeAllMarkers = useMarkerInputRemoveAllMarkers();

  const handleLatLngStringChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputLatLng(e.target.value);
  };

  const handleClickPutAMarker = () => {
    putMarker(unit);
  };

  const handleClickRemoveAllMarkers = () => {
    removeAllMarkers();
  };

  return (
    <MarkerInput
      id={props.id}
      errorMessage={errorMessage}
      latLngString={latLngString}
      handleLatLangStringChanged={handleLatLngStringChanged}
      onPutMarkerClicked={handleClickPutAMarker}
      onRemoveAllMarkersClicked={handleClickRemoveAllMarkers}
    />
  );
}

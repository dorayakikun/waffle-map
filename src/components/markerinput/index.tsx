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

/**
 * Container component that manages state and event handlers for the MarkerInput component.
 *
 * Retrieves marker input state and actions from stores, handles user interactions, and passes relevant props to the MarkerInput child component.
 *
 * @param props - Contains the unique identifier for the MarkerInput instance.
 */
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

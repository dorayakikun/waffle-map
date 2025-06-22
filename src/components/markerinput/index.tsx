import * as React from "react";
import { MarkerInput } from "./MarkerInput";
import { useMarkerInputActions, useMarkerInputState } from "../../stores/markerInputStore";
import { useGeodeticInputUnit } from "../../stores/geodeticInputStore";

type Props = {
  id: string;
};

export function MarkerInputContainer(props: Props) {
  const unit = useGeodeticInputUnit();
  const { errorMessage, latLngString } = useMarkerInputState();
  const { inputLatLng, putMarker, removeAllMarkers } = useMarkerInputActions();

  const handleLatLngStringChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      inputLatLng(e.target.value);
    },
    [inputLatLng],
  );

  const handleClickPutAMarker = React.useCallback(() => {
    putMarker(unit);
  }, [putMarker, unit]);

  const handleClickRemoveAllMarkers = React.useCallback(
    () => removeAllMarkers(),
    [removeAllMarkers],
  );

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

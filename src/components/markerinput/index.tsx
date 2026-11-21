import * as React from "react";
import { useGeodeticInputStore } from "../../stores/useGeodeticInputStore";
import { useMarkerInputStore } from "../../stores/useMarkerInputStore";
import { MarkerInput } from "./MarkerInput";

type Props = {
  id: string;
};

export function MarkerInputContainer(props: Props) {
  const unit = useGeodeticInputStore((state) => state.unit);
  const {
    errorMessage,
    latLngString,
    positions,
    inputLatLng,
    putMarker,
    removeAllMarkers,
    removeMarker,
  } = useMarkerInputStore();

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

  const handleClickRemoveMarker = React.useCallback(
    (index: number) => removeMarker(index),
    [removeMarker],
  );

  return (
    <MarkerInput
      id={props.id}
      errorMessage={errorMessage}
      latLngString={latLngString}
      positions={positions}
      handleLatLangStringChanged={handleLatLngStringChanged}
      onPutMarkerClicked={handleClickPutAMarker}
      onRemoveAllMarkersClicked={handleClickRemoveAllMarkers}
      onRemoveMarkerClicked={handleClickRemoveMarker}
    />
  );
}

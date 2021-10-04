import * as React from "react";
import { MarkerInput } from "./MarkerInput";
import { useMarkerInputDispatchContext } from "./MarkerInputDispatchContext";
import { useMarkerInputStateContext } from "./MarkerInputStateContext";
import { useGeodeticInputStateContext } from "../geodeticInput/GeodeticInputStateContext";

export function MarkerInputContainer() {
  const { unit } = useGeodeticInputStateContext();
  // FIXME: latLng => latLngString
  const { errorMessage, latLng } = useMarkerInputStateContext();
  const { putMarker, removeAllMarkers } = useMarkerInputDispatchContext();

  const handleClickPutAMarker = React.useCallback(
    (e: any) => {
      if (
        (e as React.KeyboardEvent<HTMLElement>).key === "Enter" ||
        (e as React.MouseEvent<HTMLElement>).type === "click"
      ) {
        putMarker(e.target.value, unit);
      }
    },
    [putMarker]
  );

  const handleClickRemoveAllMarkers = React.useCallback(
    () => removeAllMarkers(),
    [removeAllMarkers]
  );

  return (
    <MarkerInput
      errorMessage={errorMessage}
      latLngString={latLng}
      onPutMarkerClicked={handleClickPutAMarker}
      onRemoveAllMarkersClicked={handleClickRemoveAllMarkers}
    />
  );
}

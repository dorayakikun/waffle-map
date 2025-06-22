import * as React from "react";
import { useMapEvents } from "react-leaflet";
import { CoordPopupLayer } from "./CoordPopupLayer";
import { LatLng } from "../../domain/calculateMesh";
import {
  convertLatLngToMillisecIfNeeded,
  convertLatLngToTokyoIfNeeded,
} from "../../domain/convertLatLng";
import { round } from "../../domain/roundPoint";
import { useCoordPopupLayerState, useCoordPopupLayerActions } from "../../stores/coordPopupLayerStore";
import { useGeodeticInputState } from "../../stores/geodeticInputStore";

function createPositionDescription(
  datum: string,
  unit: string,
  latLng?: LatLng,
): string {
  if (latLng == null) {
    return "";
  }

  const a = convertLatLngToTokyoIfNeeded(latLng, datum);
  const b = convertLatLngToMillisecIfNeeded(a, unit);
  return `position: ${round(b.lat, 5)}, ${round(b.lng, 5)}`;
}

export function CoordPopupLayerContainer(): React.ReactElement | null {
  const { position } = useCoordPopupLayerState();
  const { setPosition } = useCoordPopupLayerActions();
  const { datum, unit } = useGeodeticInputState();
  const positionDescription = createPositionDescription(datum, unit, position);

  useMapEvents({
    contextmenu(e) {
      setPosition(e.latlng);
    },
  });

  return position === undefined ? null : (
    <CoordPopupLayer
      position={position}
      datum={datum}
      unit={unit}
      positionDescription={positionDescription}
    />
  );
}

import type * as React from "react";
import { useMapEvents } from "react-leaflet";
import type { LatLng } from "../../domain/calculateMesh";
import {
  convertLatLngToMillisecIfNeeded,
  convertLatLngToTokyoIfNeeded,
} from "../../domain/convertLatLng";
import { round } from "../../domain/roundPoint";
import { useGeodeticInputStore } from "../../stores/useGeodeticInputStore";
import { useCoordPopupStore } from "../../stores/useCoordPopupStore";
import { CoordPopupLayer } from "./CoordPopupLayer";

function createPositionDescription(datum: string, unit: string, latLng?: LatLng): string {
  if (latLng == null) {
    return "";
  }

  const a = convertLatLngToTokyoIfNeeded(latLng, datum);
  const b = convertLatLngToMillisecIfNeeded(a, unit);
  return `position: ${round(b.lat, 5)}, ${round(b.lng, 5)}`;
}

export function CoordPopupLayerContainer(): React.ReactElement | null {
  const { position, setPosition } = useCoordPopupStore();
  const { datum, unit } = useGeodeticInputStore();
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

import * as React from "react";
import { useMapEvents } from "react-leaflet";
import { CoordPopupLayer } from "./CoordPopupLayer";
import { LatLng } from "../../domain/calculateMesh";
import {
  convertLatLngToMillisecIfNeeded,
  convertLatLngToTokyoIfNeeded,
} from "../../domain/convertLatLng";
import { round } from "../../domain/roundPoint";
import { useCoordPopupLayerDispatchContext } from "./CoordPopupLayerDispatchContext";
import { useCoordPopupLayerStateContext } from "./CoordPopupLayerStateContext";
import { useGeodeticInputStateContext } from "../geodeticInput/GeodeticInputStateContext";

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
  const { position } = useCoordPopupLayerStateContext();
  const { setPosition } = useCoordPopupLayerDispatchContext();
  const { datum, unit } = useGeodeticInputStateContext();
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

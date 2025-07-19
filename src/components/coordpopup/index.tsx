import * as React from "react";
import { useMapEvents } from "react-leaflet";
import { CoordPopupLayer } from "./CoordPopupLayer";
import { LatLng } from "../../domain/calculateMesh";
import {
  convertLatLngToMillisecIfNeeded,
  convertLatLngToTokyoIfNeeded,
} from "../../domain/convertLatLng";
import { round } from "../../domain/roundPoint";
import {
  useCoordPopupLayerActions,
  useCoordPopupLayerState,
} from "../../stores/coordPopupLayerStore";
import { useGeodeticInputDatum, useGeodeticInputUnit } from "../../stores/geodeticInputStore";

/**
 * Generates a formatted string describing a geographic position based on the specified geodetic datum and unit.
 *
 * If `latLng` is null, returns an empty string. Otherwise, converts the coordinates according to the given datum and unit, rounds them to five decimal places, and returns a string in the format "position: <lat>, <lng>".
 *
 * @param datum - The geodetic datum to use for coordinate conversion
 * @param unit - The unit to use for coordinate conversion
 * @param latLng - The latitude and longitude to describe, or null
 * @returns A formatted position string, or an empty string if `latLng` is null
 */
function createPositionDescription(
  datum: string,
  unit: string,
  latLng: LatLng | null,
): string {
  if (latLng == null) {
    return "";
  }

  const a = convertLatLngToTokyoIfNeeded(latLng, datum);
  const b = convertLatLngToMillisecIfNeeded(a, unit);
  return `position: ${round(b.lat, 5)}, ${round(b.lng, 5)}`;
}

/**
 * React component that manages and displays a coordinate popup on a Leaflet map.
 *
 * Shows a popup with formatted position information when the user right-clicks on the map. The popup content reflects the current geodetic datum and unit settings.
 *
 * @returns The coordinate popup layer element if a position is set, otherwise `null`.
 */
export function CoordPopupLayerContainer(): React.ReactElement | null {
  const { position } = useCoordPopupLayerState();
  const { setPosition } = useCoordPopupLayerActions();
  const datum = useGeodeticInputDatum();
  const unit = useGeodeticInputUnit();
  const positionDescription = createPositionDescription(datum, unit, position);

  useMapEvents({
    contextmenu(e) {
      setPosition(e.latlng);
    },
  });

  return position && (
    <CoordPopupLayer
      position={position}
      datum={datum}
      unit={unit}
      positionDescription={positionDescription}
    />
  );
}

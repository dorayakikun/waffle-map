import * as React from "react";
import { Popup, useMapEvents } from "react-leaflet";
import { Card } from "semantic-ui-react";
import { Props } from "./Map";
import meshCalculator, { LatLng } from "../domain/calculateMesh";
import {
  convertLatLngToMillisecIfNeeded,
  convertLatLngToTokyoIfNeeded,
} from "../domain/convertLatLng";
import { round } from "../domain/roundPoint";

function createPositionDescription(
  datum: string,
  unit: string,
  latLng?: LatLng
): string {
  if (latLng == null) {
    throw new Error("latLng is missing.");
  }

  const a = convertLatLngToTokyoIfNeeded(latLng, datum);
  const b = convertLatLngToMillisecIfNeeded(a, unit);
  return `position: ${round(b.lat, 5)}, ${round(b.lng, 5)}`;
}

function createScaleDescription(
  scale: number,
  datum: string,
  latLng?: LatLng
): string {
  if (latLng == null) {
    throw new Error("Unexpected exception occured. Missing latlang.");
  }
  const { lat, lng } = convertLatLngToTokyoIfNeeded(latLng, datum);
  return `scale${scale}: ${meshCalculator.toMeshCode(lat, lng, scale)}`;
}

function createScaleCardContents(
  datum: string,
  latLng?: LatLng
): React.ReactElement[] {
  return meshCalculator.SCALES.map((scale, idx) => (
    <Card.Content
      description={createScaleDescription(scale, datum, latLng)}
      key={idx}
    />
  ));
}

export function CoordPopup(props: Props): React.ReactElement | null {
  const [position, setPosition] = React.useState<LatLng | undefined>(undefined);
  useMapEvents({
    contextmenu(e) {
      setPosition(e.latlng);
    },
  });
  return position === undefined ? null : (
    <Popup position={position}>
      <Card>
        <Card.Content header="Scales" />
        <Card.Content
          description={createPositionDescription(
            props.datum,
            props.unit,
            position
          )}
        />
        {createScaleCardContents(props.datum, position)}
      </Card>
    </Popup>
  );
}

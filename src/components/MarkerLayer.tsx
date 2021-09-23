import * as React from "react";
import { Marker } from "react-leaflet";
import { LatLng } from "../domain/calculateMesh";
import { convertLatLngToWGS84IfNeeded } from "../domain/convertLatLng";

type Props = {
  datum: string;
  positions: LatLng[];
};

export function MarkerLayer(props: Props): React.ReactElement {
  return (
    <>
      {props.positions
        .map((position) => convertLatLngToWGS84IfNeeded(position, props.datum))
        .map((position, idx) => (
          <Marker key={idx} position={position} />
        ))}
    </>
  );
}

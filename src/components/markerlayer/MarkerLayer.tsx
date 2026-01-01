import type * as React from "react";
import { Marker } from "react-leaflet";
import type { LatLng } from "../../domain/calculateMesh";
import { convertLatLngToWGS84IfNeeded } from "../../domain/convertLatLng";

type Props = {
  datum: string;
  positions: LatLng[];
};

export function MarkerLayer(props: Props): React.ReactElement {
  return (
    <>
      {props.positions
        .map((position) => convertLatLngToWGS84IfNeeded(position, props.datum))
        .map((position) => (
          <Marker key={`${position.lat}-${position.lng}`} position={position} />
        ))}
    </>
  );
}

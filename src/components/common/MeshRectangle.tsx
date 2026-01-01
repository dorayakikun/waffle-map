import type * as React from "react";
import { Rectangle, Tooltip } from "react-leaflet";
import type { Bounds } from "../../domain/calculateMesh";

type Props = {
  bounds: Bounds;
  index: number;
  meshCode: string;
  color: string;
};

export function MeshRectangle(props: Props): React.ReactElement {
  return (
    <Rectangle
      bounds={[
        [props.bounds.leftTop.lat, props.bounds.leftTop.lng],
        [props.bounds.rightBottom.lat, props.bounds.rightBottom.lng],
      ]}
      key={props.index}
      color={props.color}
    >
      <Tooltip>
        <span>{props.meshCode}</span>
      </Tooltip>
    </Rectangle>
  );
}

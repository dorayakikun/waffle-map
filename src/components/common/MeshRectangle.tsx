import { Bounds } from "../../domain/calculateMesh";
import * as React from "react";
import { Rectangle, Tooltip } from "react-leaflet";

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

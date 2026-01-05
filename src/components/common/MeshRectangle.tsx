import type * as React from "react";
import type { LatLngBoundsExpression } from "leaflet";
import { Rectangle, SVGOverlay } from "react-leaflet";
import type { Bounds } from "../../domain/calculateMesh";
import { MESH_COLORS } from "../../theme/constants";

type Props = {
  bounds: Bounds;
  index: number;
  meshCode: string;
  color: string;
  showLabel?: boolean;
};

export function MeshRectangle(props: Props): React.ReactElement {
  const leafletBounds: LatLngBoundsExpression = [
    [props.bounds.leftTop.lat, props.bounds.leftTop.lng],
    [props.bounds.rightBottom.lat, props.bounds.rightBottom.lng],
  ];

  return (
    <>
      <Rectangle
        bounds={leafletBounds}
        key={props.index}
        color={props.color}
      />
      {props.showLabel !== false && (
        <SVGOverlay bounds={leafletBounds}>
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <text
              x="50"
              y="50"
              dominantBaseline="middle"
              textAnchor="middle"
              style={{
                fontSize: 12,
                fontFamily: 'Lato, "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 700,
                fill: props.color,
                stroke: MESH_COLORS.label.stroke,
                strokeWidth: 0.5,
                paintOrder: "stroke fill",
              }}
            >
              {props.meshCode}
            </text>
          </svg>
        </SVGOverlay>
      )}
    </>
  );
}

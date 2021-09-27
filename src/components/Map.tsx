import { Box } from "@chakra-ui/react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { BoundFitter } from "./BoundFitter";
import { CoordPopupLayer } from "./CoordPopupLayer";
import { DebugTileLayer } from "./DebugTileLayer";
import { MarkerLayer } from "./MarkerLayer";
import { MeshLayer } from "./MeshLayer";
import { LatLng, Mesh } from "../domain/calculateMesh";
import { convertBoundsToWGS84IfNeeded } from "../domain/convertLatLng";
import { MeshRectangle } from "./MeshRectangle";

delete (L.Icon as any).Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export type Props = {
  meshes: Mesh[];
  datum: string;
  unit: string;
  contextmenuPosition?: LatLng;
  isShowDebugTiles: boolean;
  isShowMeshes: boolean;
  markerPositions: LatLng[];
};

export const initialLeafletBounds: [number, number][] = [
  [35, 139],
  [37, 140],
];

export function Map(props: Props) {
  const { meshes, markerPositions, datum } = props;
  return (
    <Box>
      <LeafletMap
        bounds={initialLeafletBounds}
        maxZoom={18}
        minZoom={5}
        style={{ width: "100%", height: "100vh" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {props.isShowDebugTiles && <DebugTileLayer />}
        {props.isShowMeshes && <MeshLayer color={"#9C27B0"} datum={datum} />}
        <>
          {meshes.map((mesh, index) => {
            const bounds = convertBoundsToWGS84IfNeeded(
              mesh.bounds,
              props.datum
            );
            return (
              <MeshRectangle
                key={`mesh_rectangle_${mesh.code}`}
                bounds={bounds}
                index={index}
                meshCode={mesh.code}
                color={"#00847e"}
              />
            );
          })}
        </>
        <MarkerLayer datum={props.datum} positions={markerPositions} />
        <CoordPopupLayer {...props} />
        <BoundFitter {...props} />
      </LeafletMap>
    </Box>
  );
}

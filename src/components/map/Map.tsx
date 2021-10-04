import { Box } from "@chakra-ui/react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { BoundFitterContainer } from "../boundsfitter/";
import { CoordPopupLayerContainer } from "../coordpopup/";
import { DebugTileLayer } from "../DebugTileLayer";
import { MarkerlayerContainer } from "../markerlayer/index";
import { MeshLayer } from "../MeshLayer";
import { Mesh } from "../../domain/calculateMesh";
import { convertBoundsToWGS84IfNeeded } from "../../domain/convertLatLng";
import { MeshRectangle } from "../MeshRectangle";

delete (L.Icon as any).Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
export const initialLeafletBounds: [number, number][] = [
  [35, 139],
  [37, 140],
];

export function Map() {
  // FIXME
  const meshes: Mesh[] = [];
  const datum = "";
  const isShowDebugTiles = false;
  const isShowMeshes = false;
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
        {isShowDebugTiles && <DebugTileLayer />}
        {isShowMeshes && <MeshLayer color={"#9C27B0"} datum={datum} />}
        <>
          {meshes.map((mesh, index) => {
            const bounds = convertBoundsToWGS84IfNeeded(mesh.bounds, datum);
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
        <MarkerlayerContainer />
        <CoordPopupLayerContainer />
        <BoundFitterContainer />
      </LeafletMap>
    </Box>
  );
}

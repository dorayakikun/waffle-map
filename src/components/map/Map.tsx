import { Box } from "@chakra-ui/react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { BoundFitterContainer } from "../boundsfitter/";
import { CoordPopupLayerContainer } from "../coordpopup/";
import { DebugtilelayerContainer } from "../debugtilelayer/";
import { MarkerlayerContainer } from "../markerlayer/index";
import { MeshLayerContainer } from "../meshlayer/index";
import { UserInputMeshLayerContainer } from "../userinputmeshlayer/index";

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
        <DebugtilelayerContainer />
        <MeshLayerContainer />
        <UserInputMeshLayerContainer />
        <MarkerlayerContainer />
        <CoordPopupLayerContainer />
        <BoundFitterContainer />
      </LeafletMap>
    </Box>
  );
}

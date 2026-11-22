import { Box } from "@chakra-ui/react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { BoundFitterContainer } from "../boundsfitter/";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { CoordPopupLayerContainer } from "../coordpopup/";
import { DebugtilelayerContainer } from "../debugtilelayer/";
import { MarkerlayerContainer } from "../markerlayer/index";
import { MeshLayerContainer } from "../meshlayer/index";
import { UserInputMeshLayerContainer } from "../userinputmeshlayer/index";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});
export const initialLeafletBounds: [number, number][] = [
  [35, 139],
  [37, 140],
];

export function MapView() {
  return (
    <Box w="full" h="full">
      <ErrorBoundary>
        <LeafletMap
          bounds={initialLeafletBounds}
          maxZoom={18}
          minZoom={5}
          style={{ width: "100%", height: "100%" }}
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
      </ErrorBoundary>
    </Box>
  );
}

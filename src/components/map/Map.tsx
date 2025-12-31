import { Box } from "@chakra-ui/react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import * as React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { BoundFitterContainer } from "../boundsfitter/";
import { CoordPopupLayerContainer } from "../coordpopup/";
import { DebugtilelayerContainer } from "../debugtilelayer/";
import { MarkerlayerContainer } from "../markerlayer/index";
import { MeshLayerContainer } from "../meshlayer/index";
import { UserInputMeshLayerContainer } from "../userinputmeshlayer/index";

/**
 * Leaflet Default Icon workaround for Vite/Webpack bundlers.
 *
 * Problem: Leaflet's L.Icon.Default uses _getIconUrl() to resolve icon paths from CSS.
 * Bundlers rewrite CSS URLs, breaking this automatic path detection.
 *
 * Solution: Delete _getIconUrl to disable auto-detection, then manually specify icon URLs
 * via mergeOptions() with ES module imports.
 *
 * References:
 * - https://github.com/PaulLeCam/react-leaflet/issues/808
 * - https://github.com/Leaflet/Leaflet/issues/4968
 * - https://github.com/ghybs/leaflet-defaulticon-compatibility
 */
// biome-ignore lint/performance/noDelete: Required to disable Leaflet's broken CSS-based icon URL detection
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

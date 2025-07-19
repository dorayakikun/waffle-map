import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { BoundFitterContainer } from "../boundsfitter/";
import { CoordPopupLayerContainer } from "../coordpopup/";
import { DebugtilelayerContainer } from "../debugtilelayer/";
import { MarkerlayerContainer } from "../markerlayer/index";
import { MeshLayerContainer } from "../meshlayer/index";
import { UserInputMeshLayerContainer } from "../userinputmeshlayer/index";

delete (L.Icon as any).Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});
export const initialLeafletBounds: [number, number][] = [
  [35, 139],
  [37, 140],
];

/**
 * Renders an interactive Leaflet map with OpenStreetMap tiles and multiple custom overlay layers.
 *
 * The map initializes with predefined bounds and includes layers for debugging, mesh visualization, user input, markers, coordinate popups, and automatic bounding box fitting.
 *
 * @returns A React element containing the configured map and its overlays.
 */
export function Map() {
  return (
    <div>
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
    </div>
  );
}

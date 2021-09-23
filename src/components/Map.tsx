import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import {
  MapContainer as LeafletMap,
  TileLayer,
  MapConsumer,
} from "react-leaflet";
import { CoordPopup } from "./CoordPopup";
import { DebugTileLayer } from "./DebugTileLayer";
import { MarkerLayer } from "./MarkerLayer";
import { MeshLayer } from "./MeshLayer";
import { LatLng, Mesh } from "../domain/calculateMesh";
import {
  convertBoundsToWGS84IfNeeded,
  convertLatLngToWGS84IfNeeded,
} from "../domain/convertLatLng";
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

const initialLeafletBounds: [number, number][] = [
  [35, 139],
  [37, 140],
];

function meshesToLatsAndLngs(
  meshes: Mesh[],
  datum: string
): { lats: number[]; lngs: number[] } {
  const lats: number[] = [];
  const lngs: number[] = [];
  meshes
    .map((mesh) => mesh.bounds)
    .map((bounds) => convertBoundsToWGS84IfNeeded(bounds, datum))
    .map((bounds) => [bounds.leftTop, bounds.rightBottom])
    .reduce((accumrator, current) => accumrator.concat(current), [])
    .forEach((latLng) => {
      lats.push(latLng.lat);
      lngs.push(latLng.lng);
    });
  return {
    lats,
    lngs,
  };
}

function calculateLeafletBounds(
  meshes: Mesh[],
  markerPositions: LatLng[],
  datum: string
): [number, number][] {
  if (meshes.length === 0 && markerPositions.length === 0) {
    return initialLeafletBounds;
  }
  const latsAndLngs = meshesToLatsAndLngs(meshes, datum);
  const lats: number[] = latsAndLngs.lats;
  const lngs: number[] = latsAndLngs.lngs;

  markerPositions
    .map((position) => convertLatLngToWGS84IfNeeded(position, datum))
    .forEach((position) => {
      lats.push(position.lat);
      lngs.push(position.lng);
    });

  return [
    [Math.min(...lats), Math.max(...lngs)],
    [Math.max(...lats), Math.min(...lngs)],
  ];
}

export function Map(props: Props) {
  const { meshes, markerPositions, datum } = props;
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <LeafletMap
        bounds={calculateLeafletBounds(meshes, markerPositions, datum)}
        maxZoom={18}
        minZoom={5}
        style={{ width: "100%", height: "100vh" }}
      >
        <MapConsumer>
          {(map) => {
            React.useEffect(() => {
              map.fitBounds(
                calculateLeafletBounds(meshes, markerPositions, datum)
              );
            });
            return null;
          }}
        </MapConsumer>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {props.isShowDebugTiles && <DebugTileLayer />}
        {props.isShowMeshes && (
          <MeshLayer color={"#9C27B0"} datum={props.datum} />
        )}
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
        <CoordPopup {...props} />
      </LeafletMap>
    </div>
  );
}

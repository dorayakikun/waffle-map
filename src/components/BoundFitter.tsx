import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLng, Mesh } from "../domain/calculateMesh";
import {
  convertBoundsToWGS84IfNeeded,
  convertLatLngToWGS84IfNeeded,
} from "../domain/convertLatLng";
import { initialLeafletBounds } from "./Map";

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

type Props = {
  meshes: Mesh[];
  markerPositions: LatLng[];
  datum: string;
};

export function BoundFitter(props: Props) {
  const { meshes, markerPositions, datum } = props;
  const map = useMap();
  useEffect(() => {
    map.fitBounds(calculateLeafletBounds(meshes, markerPositions, datum));
  });
  return null;
}

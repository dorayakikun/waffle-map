import * as React from "react";
import type { LatLng, Mesh } from "../../domain/calculateMesh";
import {
  convertBoundsToWGS84IfNeeded,
  convertLatLngToWGS84IfNeeded,
} from "../../domain/convertLatLng";
import type { Meshcode } from "../../types";
import { useGeodeticInputStore } from "../../stores/useGeodeticInputStore";
// FIXME initialLeafletBounds を constans に移動する
import { initialLeafletBounds } from "../map/Map";
import { useMarkerInputStore } from "../../stores/useMarkerInputStore";
import { useMeshcodesInputStore } from "../../stores/useMeshcodesInputStore";
import { BoundsFitter } from "./BoundsFitter";

function meshesToLatsAndLngs(
  meshes: Record<Meshcode, Mesh>,
  meshcodes: Meshcode[],
  datum: string,
): { lats: number[]; lngs: number[] } {
  const lats: number[] = [];
  const lngs: number[] = [];
  const latLngs = meshcodes
    .map((meshcode) => meshes[meshcode].bounds)
    .map((bounds) => convertBoundsToWGS84IfNeeded(bounds, datum))
    .map((bounds) => [bounds.leftTop, bounds.rightBottom])
    .reduce((accumrator, current) => accumrator.concat(current), []);
  for (const latLng of latLngs) {
    lats.push(latLng.lat);
    lngs.push(latLng.lng);
  }
  return {
    lats,
    lngs,
  };
}

function calculateLeafletBounds(
  meshes: Record<Meshcode, Mesh>,
  meshcodes: Meshcode[],
  markerPositions: LatLng[],
  datum: string,
): [number, number][] {
  if (meshcodes.length === 0 && markerPositions.length === 0) {
    return initialLeafletBounds;
  }
  const latsAndLngs = meshesToLatsAndLngs(meshes, meshcodes, datum);
  const lats: number[] = latsAndLngs.lats;
  const lngs: number[] = latsAndLngs.lngs;

  const convertedPositions = markerPositions.map((position) =>
    convertLatLngToWGS84IfNeeded(position, datum),
  );
  for (const position of convertedPositions) {
    lats.push(position.lat);
    lngs.push(position.lng);
  }

  return [
    [Math.min(...lats), Math.max(...lngs)],
    [Math.max(...lats), Math.min(...lngs)],
  ];
}

export function BoundFitterContainer() {
  const { userInputMeshes, meshcodes } = useMeshcodesInputStore();
  const positions = useMarkerInputStore((state) => state.positions);
  const datum = useGeodeticInputStore((state) => state.datum);
  const bounds = calculateLeafletBounds(userInputMeshes, meshcodes, positions, datum);
  return <BoundsFitter bounds={bounds} />;
}

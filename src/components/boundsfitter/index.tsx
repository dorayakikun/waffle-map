import * as React from "react";
import { LatLng, Mesh } from "../../domain/calculateMesh";
import {
  convertBoundsToWGS84IfNeeded,
  convertLatLngToWGS84IfNeeded,
} from "../../domain/convertLatLng";
// FIXME initialLeafletBounds を constans に移動する
import { initialLeafletBounds } from "../map/Map";
import { BoundsFitter } from "./BoundsFitter";
import { useMeshCodeInputStateContext } from "../meshcodeinput/MeshcodesInputStateContext";
import { Meshcode } from "../../types";
import { useGeodeticInputDatum } from "../../stores/geodeticInputStore";
import { useMarkerInputStateContext } from "../markerinput/MarkerInputStateContext";

function meshesToLatsAndLngs(
  meshes: Record<Meshcode, Mesh>,
  meshcodes: Meshcode[],
  datum: string,
): { lats: number[]; lngs: number[] } {
  const lats: number[] = [];
  const lngs: number[] = [];
  meshcodes
    .map((meshcode) => meshes[meshcode].bounds)
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

export function BoundFitterContainer() {
  const { userInputMeshes, meshcodes } = useMeshCodeInputStateContext();
  const { positions } = useMarkerInputStateContext();
  const datum = useGeodeticInputDatum();
  const bounds = calculateLeafletBounds(
    userInputMeshes,
    meshcodes,
    positions,
    datum,
  );
  return <BoundsFitter bounds={bounds} />;
}

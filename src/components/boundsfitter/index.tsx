import { LatLng, Mesh } from "../../domain/calculateMesh";
import {
  convertBoundsToWGS84IfNeeded,
  convertLatLngToWGS84IfNeeded,
} from "../../domain/convertLatLng";
// FIXME initialLeafletBounds を constans に移動する
import { initialLeafletBounds } from "../map/Map";
import { BoundsFitter } from "./BoundsFitter";
import {
  useMeshcodesInputMeshcodes,
  useMeshcodesInputUserInputMeshes,
} from "../../stores/meshcodesInputStore";
import { Meshcode } from "../../types";
import { useGeodeticInputDatum } from "../../stores/geodeticInputStore";
import { useMarkerInputPositions } from "../../stores/markerInputStore";

/**
 * Extracts arrays of latitudes and longitudes from the bounds of the specified meshes, converting coordinates to WGS84 if required.
 *
 * Only meshes present in the input record are considered. The returned arrays contain the latitudes and longitudes of the top-left and bottom-right corners of each mesh's bounds.
 *
 * @param meshes - A record mapping meshcodes to mesh objects
 * @param meshcodes - An array of meshcodes to process
 * @param datum - The geodetic datum of the input meshes; coordinates are converted to WGS84 if needed
 * @returns An object containing arrays of latitudes (`lats`) and longitudes (`lngs`) from the mesh bounds
 */
function meshesToLatsAndLngs(
  meshes: Record<Meshcode, Mesh>,
  meshcodes: Meshcode[],
  datum: string,
): { lats: number[]; lngs: number[] } {
  const lats: number[] = [];
  const lngs: number[] = [];
  meshcodes
    .map((meshcode) => meshes[meshcode])
    .filter((mesh) => mesh != null) // Filter out undefined meshes
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

/**
 * Calculates the bounding box that encompasses the specified meshes and marker positions, returning coordinates suitable for Leaflet map fitting.
 *
 * If no meshes or marker positions are provided, or if no valid coordinates are found, returns the initial default bounds.
 *
 * @param meshes - A record of mesh objects keyed by meshcode
 * @param meshcodes - An array of meshcodes to include in the bounds calculation
 * @param markerPositions - An array of marker positions to include in the bounds calculation
 * @param datum - The geodetic datum used for coordinate conversion
 * @returns An array of two coordinate pairs representing the southwest and northeast corners of the bounding box
 */
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

  // If no valid coordinates are available, return initial bounds
  if (lats.length === 0 || lngs.length === 0) {
    return initialLeafletBounds;
  }

  return [
    [Math.min(...lats), Math.max(...lngs)],
    [Math.max(...lats), Math.min(...lngs)],
  ];
}

/**
 * React container component that computes map bounds from user-selected meshes and marker positions, and renders a `BoundsFitter` with those bounds.
 *
 * Retrieves mesh data, meshcodes, marker positions, and geodetic datum from application stores, calculates the appropriate map bounds, and passes them to the `BoundsFitter` component for map fitting.
 */
export function BoundFitterContainer() {
  const userInputMeshes = useMeshcodesInputUserInputMeshes();
  const meshcodes = useMeshcodesInputMeshcodes();
  const positions = useMarkerInputPositions();
  const datum = useGeodeticInputDatum();
  const bounds = calculateLeafletBounds(
    userInputMeshes,
    meshcodes,
    positions,
    datum,
  );
  return <BoundsFitter bounds={bounds} />;
}

import * as React from "react";
import { useMapEvents } from "react-leaflet";
import meshCalculator, { type LatLng, type Mesh } from "../../domain/calculateMesh";
import { convertBoundsToWGS84IfNeeded } from "../../domain/convertLatLng";
import { MeshRectangle } from "../common/MeshRectangle";
import { useGeodeticInputStore } from "../../stores/useGeodeticInputStore";
import { useMeshToggleStore } from "../../stores/useMeshToggleStore";

function getSquareMeshCodes(meshCode: string, redius: number): string[] {
  const meshCodes: string[] = [];
  for (let i = -redius; i <= redius; i++) {
    for (let j = -redius; j <= redius; j++) {
      const code: string = meshCalculator.offset(meshCode, i, j);
      meshCodes.push(code);
    }
  }
  return meshCodes;
}

function createMesh(code: string): Mesh {
  return {
    bounds: meshCalculator.toBounds(code),
    center: meshCalculator.toCenterLatLng(code),
    code,
  };
}

function getSquareMeshes(latlng: LatLng, zoom: number, redius: number): Mesh[] {
  const scale: number = meshCalculator.scaleFrom(zoom);
  const centerMeshCode = meshCalculator.toMeshCode(latlng.lat, latlng.lng, scale);
  const meshCodes: string[] = getSquareMeshCodes(centerMeshCode, redius);
  return meshCodes.map(createMesh);
}

export const MeshLayerContainer = () => {
  const [latlng, setLatlng] = React.useState({ lat: 36.01357, lng: 139.49891 });
  const [zoom, setZoom] = React.useState(6);
  const datum = useGeodeticInputStore((state) => state.datum);
  const map = useMapEvents({
    zoomlevelschange() {
      setLatlng(map.getCenter());
      setZoom(map.getZoom());
    },
    moveend() {
      setLatlng(map.getCenter());
      setZoom(map.getZoom());
    },
  });

  const enableMeshGrid = useMeshToggleStore((state) => state.enableMeshGrid);
  if (!enableMeshGrid) {
    return null;
  }

  const meshes = getSquareMeshes(latlng, zoom, 10);

  return (
    <>
      {meshes.map((mesh, index) => {
        const bounds = convertBoundsToWGS84IfNeeded(mesh.bounds, datum);
        return (
          <MeshRectangle
            key={`mesh_layer_${mesh.code}`}
            bounds={bounds}
            index={index}
            meshCode={mesh.code}
            color={"#9C27B0"}
          />
        );
      })}
    </>
  );
};

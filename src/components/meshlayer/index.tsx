import * as React from "react";
import { useMapEvents } from "react-leaflet";
import { getMeshCalculator, LatLng, Mesh } from "../../domain/calculateMesh";
import { convertBoundsToWGS84IfNeeded } from "../../domain/convertLatLng";
import { MeshRectangle } from "../common/MeshRectangle";
import { useGeodeticInputDatum } from "../../stores/geodeticInputStore";
import { useMeshToggleEnableMeshGrid } from "../../stores/meshToggleStore";

function getSquareMeshCodes(meshCode: string, redius: number, meshCalculator: any): string[] {
  const meshCodes: string[] = [];
  for (let i = -redius; i <= redius; i++) {
    for (let j = -redius; j <= redius; j++) {
      const code: string = meshCalculator.offset(meshCode, i, j);
      meshCodes.push(code);
    }
  }
  return meshCodes;
}

function createMesh(code: string, meshCalculator: any): Mesh {
  return {
    bounds: meshCalculator.toBounds(code),
    center: meshCalculator.toCenterLatLng(code),
    code,
  };
}

function getSquareMeshes(latlng: LatLng, zoom: number, redius: number, meshCalculator: any): Mesh[] {
  const scale: number = meshCalculator.scaleFrom(zoom);
  const centerMeshCode = meshCalculator.toMeshCode(
    latlng.lat,
    latlng.lng,
    scale,
  );
  const meshCodes: string[] = getSquareMeshCodes(centerMeshCode, redius, meshCalculator);
  return meshCodes.map((code) => createMesh(code, meshCalculator));
}

export const MeshLayerContainer = () => {
  const [latlng, setLatlng] = React.useState({ lat: 36.01357, lng: 139.49891 });
  const [zoom, setZoom] = React.useState(6);
  const [meshCalculator, setMeshCalculator] = React.useState<any>(null);
  const [meshes, setMeshes] = React.useState<Mesh[]>([]);
  const datum = useGeodeticInputDatum();
  
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

  // Load mesh calculator on component mount
  React.useEffect(() => {
    getMeshCalculator().then(setMeshCalculator);
  }, []);

  // Update meshes when mesh calculator, position, or zoom changes
  React.useEffect(() => {
    if (meshCalculator) {
      const newMeshes = getSquareMeshes(latlng, zoom, 10, meshCalculator);
      setMeshes(newMeshes);
    }
  }, [meshCalculator, latlng, zoom]);

  const enableMeshGrid = useMeshToggleEnableMeshGrid();
  if (!enableMeshGrid || !meshCalculator) {
    return null;
  }

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
            color="#9C27B0"
          />
        );
      })}
    </>
  );
};

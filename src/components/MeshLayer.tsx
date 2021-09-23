import * as React from "react";
import { useMapEvents } from "react-leaflet";
import meshCalculator, { LatLng, Mesh } from "../domain/calculateMesh";
import { convertBoundsToWGS84IfNeeded } from "../domain/convertLatLng";
import { MeshRectangle } from "./MeshRectangle";

export type Props = {
  color: string;
  datum: string;
};

export type InternalProps = {
  color: string;
  datum: string;
  latlng: LatLng;
  zoom: number;
};

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
  const centerMeshCode = meshCalculator.toMeshCode(
    latlng.lat,
    latlng.lng,
    scale
  );
  const meshCodes: string[] = getSquareMeshCodes(centerMeshCode, redius);
  return meshCodes.map(createMesh);
}

function InternalMeshLayer(props: InternalProps) {
  const meshes = getSquareMeshes(props.latlng, props.zoom, 20);
  return (
    <>
      {meshes.map((mesh, index) => {
        const bounds = convertBoundsToWGS84IfNeeded(mesh.bounds, props.datum);
        return (
          <MeshRectangle
            key={`mesh_layer_${mesh.code}`}
            bounds={bounds}
            index={index}
            meshCode={mesh.code}
            color={props.color}
          />
        );
      })}
    </>
  );
}

export function MeshLayer(props: Props): React.ReactElement {
  const [latlng, setLatlng] = React.useState({ lat: 36.01357, lng: 139.49891 });
  const [zoom, setZoom] = React.useState(6);
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
  return (
    <InternalMeshLayer
      latlng={latlng}
      zoom={zoom}
      color={props.color}
      datum={props.datum}
    />
  );
}

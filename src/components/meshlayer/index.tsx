import * as React from "react";
import { useMapEvents } from "react-leaflet";
import meshCalculator, { type LatLng, type Mesh } from "../../domain/calculateMesh";
import { convertBoundsToWGS84IfNeeded } from "../../domain/convertLatLng";
import { useGeodeticInputStore } from "../../stores/useGeodeticInputStore";
import { useMeshToggleStore } from "../../stores/useMeshToggleStore";
import { MESH_COLORS } from "../../theme/constants";
import { MeshRectangle } from "../common/MeshRectangle";

const MAP_EVENT_DEBOUNCE_MS = 200;

function getSquareMeshCodes(meshCode: string, radius: number): string[] {
  const meshCodes: string[] = [];
  for (let i = -radius; i <= radius; i++) {
    for (let j = -radius; j <= radius; j++) {
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

function getSquareMeshes(latlng: LatLng, zoom: number, radius: number): Mesh[] {
  const scale: number = meshCalculator.scaleFrom(zoom);
  const centerMeshCode = meshCalculator.toMeshCode(latlng.lat, latlng.lng, scale);
  const meshCodes: string[] = getSquareMeshCodes(centerMeshCode, radius);
  return meshCodes.map(createMesh);
}

const MemoizedMeshRectangle = React.memo(MeshRectangle);

export const MeshLayerContainer = React.memo(function MeshLayerContainer() {
  const [latlng, setLatlng] = React.useState<LatLng>({ lat: 36.01357, lng: 139.49891 });
  const [zoom, setZoom] = React.useState(6);
  const [isZooming, setIsZooming] = React.useState(false);
  const datum = useGeodeticInputStore((state) => state.datum);
  const enableMeshGrid = useMeshToggleStore((state) => state.enableMeshGrid);

  const updateTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const debouncedUpdate = React.useCallback((map: L.Map) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    updateTimeoutRef.current = setTimeout(() => {
      const center = map.getCenter();
      setLatlng({ lat: center.lat, lng: center.lng });
      setZoom(map.getZoom());
      setIsZooming(false);
    }, MAP_EVENT_DEBOUNCE_MS);
  }, []);

  const map = useMapEvents({
    zoomstart() {
      setIsZooming(true);
    },
    zoomend() {
      debouncedUpdate(map);
    },
    zoomlevelschange() {
      debouncedUpdate(map);
    },
    moveend() {
      debouncedUpdate(map);
    },
  });

  React.useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  const meshes = React.useMemo(() => {
    if (!enableMeshGrid) {
      return [];
    }
    return getSquareMeshes(latlng, zoom, 10);
  }, [latlng, zoom, enableMeshGrid]);

  if (!enableMeshGrid) {
    return null;
  }

  return (
    <>
      {meshes.map((mesh, index) => {
        const bounds = convertBoundsToWGS84IfNeeded(mesh.bounds, datum);
        return (
          <MemoizedMeshRectangle
            key={`mesh_layer_${mesh.code}`}
            bounds={bounds}
            index={index}
            meshCode={mesh.code}
            color={MESH_COLORS.grid}
            showLabel={!isZooming}
          />
        );
      })}
    </>
  );
});

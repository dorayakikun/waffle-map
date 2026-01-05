import * as React from "react";
import { useMapEvents } from "react-leaflet";
import meshCalculator, { type LatLng, type Mesh } from "../../domain/calculateMesh";
import { convertBoundsToWGS84IfNeeded } from "../../domain/convertLatLng";
import { useGeodeticInputStore } from "../../stores/useGeodeticInputStore";
import { useMeshToggleStore } from "../../stores/useMeshToggleStore";
import { MESH_COLORS } from "../../theme/constants";
import { MeshRectangle } from "../common/MeshRectangle";

/**
 * Debounce delay for map events in milliseconds.
 */
const MAP_EVENT_DEBOUNCE_MS = 200;

/**
 * Generate mesh codes in a square pattern around a center mesh.
 */
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

/**
 * Create a Mesh object from a mesh code.
 */
function createMesh(code: string): Mesh {
  return {
    bounds: meshCalculator.toBounds(code),
    center: meshCalculator.toCenterLatLng(code),
    code,
  };
}

/**
 * Get meshes in a square pattern around the given coordinates.
 */
function getSquareMeshes(latlng: LatLng, zoom: number, radius: number): Mesh[] {
  const scale: number = meshCalculator.scaleFrom(zoom);
  const centerMeshCode = meshCalculator.toMeshCode(latlng.lat, latlng.lng, scale);
  const meshCodes: string[] = getSquareMeshCodes(centerMeshCode, radius);
  return meshCodes.map(createMesh);
}

/**
 * Memoized MeshRectangle component to prevent unnecessary re-renders.
 */
const MemoizedMeshRectangle = React.memo(MeshRectangle);

/**
 * Container component that renders the mesh grid overlay on the map.
 * Optimized with memoization and debounced map event handlers.
 */
export const MeshLayerContainer = React.memo(function MeshLayerContainer() {
  const [latlng, setLatlng] = React.useState<LatLng>({ lat: 36.01357, lng: 139.49891 });
  const [zoom, setZoom] = React.useState(6);
  const [isZooming, setIsZooming] = React.useState(false);
  const datum = useGeodeticInputStore((state) => state.datum);
  const enableMeshGrid = useMeshToggleStore((state) => state.enableMeshGrid);

  // Ref for debounce timeout
  const updateTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Debounced update function
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

  // Setup map event listeners
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

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  // Memoize meshes calculation - only recalculate when latlng, zoom, or enableMeshGrid changes
  const meshes = React.useMemo(() => {
    if (!enableMeshGrid) {
      return [];
    }
    return getSquareMeshes(latlng, zoom, 10);
  }, [latlng, zoom, enableMeshGrid]);

  // Early return if mesh grid is disabled
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

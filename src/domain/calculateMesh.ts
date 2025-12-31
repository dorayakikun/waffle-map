declare const LOGIC_TYPE: string | undefined;

export type LatLng = {
  lat: number;
  lng: number;
};

export type Bounds = {
  leftTop: LatLng;
  rightBottom: LatLng;
};

export type Mesh = {
  code: string;
  center: LatLng;
  bounds: Bounds;
};

type MeshCalculator = {
  SCALES: number[];
  toCenterLatLng: (meshCode: string) => LatLng;
  toBounds: (meshCode: string) => Bounds;
  toMeshCode: (lat: number, lng: number, scale: number) => string;
  scaleFrom(zoom: number): number;
  offset(meshCode: string, x: number, y: number): string;
};

const loadMeshCalculator = async (): Promise<MeshCalculator> => {
  if (LOGIC_TYPE) {
    const module = await import(
      /* @vite-ignore */ `waffle-map-mesh-calculator-${LOGIC_TYPE}`
    );
    return module.default ?? module;
  }
  const module = await import("waffle-map-mesh-calculator-basic");
  return module.default ?? module;
};

const meshCalculator = await loadMeshCalculator();

export default meshCalculator;

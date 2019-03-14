declare const require: any;
declare const LOGIC_TYPE: string;

export type LatLng = {
  lat: number;
  lng: number;
}

export type Bounds = {
  leftTop: LatLng;
  rightBottom: LatLng;
}

export type Mesh = {
  code: string;
  center: LatLng;
  bounds: Bounds;
}

type MeshCalculator = {
  SCALES: number[];
  toCenterLatLng: (meshCode: string) => LatLng;
  toBounds: (meshCode: string) => Bounds;
  toMeshCode: (lat: number, lng: number, scale: number) => string;
  scaleFrom(zoom: number): number;
  offset(meshCode: string, x: number, y: number): string;
}

const meshCalculator: () => MeshCalculator = () => {
  if (LOGIC_TYPE) {
    return require(`waffle-map-mesh-calculator-${LOGIC_TYPE}`);
  }
  return require("waffle-map-mesh-calculator-basic");
};

export default meshCalculator();

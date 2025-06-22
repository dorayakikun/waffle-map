import * as basicCalculator from "waffle-map-mesh-calculator-basic";

declare const LOGIC_TYPE: string;

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

const meshCalculator: () => MeshCalculator = () => {
  // For now, always use the basic calculator since dynamic imports with require() 
  // are not supported in ES modules. In the future, this could be enhanced with
  // dynamic import() for different calculator types.
  return basicCalculator as any;
};

export default meshCalculator();

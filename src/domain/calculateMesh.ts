declare const MESH_CALCULATOR_TYPE: string;

// Import the basic calculator statically to avoid dynamic import issues
import * as basicMeshCalculator from 'waffle-map-mesh-calculator-basic';

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

// Function to get mesh calculator based on configuration
function getMeshCalculatorSync(): MeshCalculator {
  const calculatorType = MESH_CALCULATOR_TYPE;
  
  // For now, only the basic calculator is supported
  // In the future, this can be extended to support other calculator types
  if (calculatorType !== 'basic') {
    console.warn(`Calculator type '${calculatorType}' is not yet supported, falling back to basic calculator`);
  }
  
  console.log(`Loaded mesh calculator: waffle-map-mesh-calculator-basic`);
  return basicMeshCalculator as MeshCalculator;
}

// Create a singleton instance
let meshCalculatorInstance: MeshCalculator | null = null;

// Function to get the mesh calculator (singleton pattern)
export function getMeshCalculator(): Promise<MeshCalculator> {
  if (!meshCalculatorInstance) {
    meshCalculatorInstance = getMeshCalculatorSync();
  }
  return Promise.resolve(meshCalculatorInstance);
}

// For backward compatibility, export the promise as default
export default getMeshCalculator();

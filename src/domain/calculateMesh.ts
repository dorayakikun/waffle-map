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

/**
 * Returns a mesh calculator instance based on the configured calculator type.
 *
 * If the configured type is not supported, falls back to the basic mesh calculator.
 * Currently, only the basic calculator is available.
 *
 * @returns A MeshCalculator instance
 */
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

/**
 * Returns a promise that resolves to a singleton instance of the mesh calculator.
 *
 * Ensures that only one instance of the mesh calculator is created and reused throughout the application.
 * @returns A promise resolving to the mesh calculator instance
 */
export function getMeshCalculator(): Promise<MeshCalculator> {
  if (!meshCalculatorInstance) {
    meshCalculatorInstance = getMeshCalculatorSync();
  }
  return Promise.resolve(meshCalculatorInstance);
}

// For backward compatibility, export the promise as default
export default getMeshCalculator();

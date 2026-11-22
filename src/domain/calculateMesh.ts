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

let loadedCalculator: MeshCalculator | null = null;
let loadError: Error | null = null;
let initPromise: Promise<boolean> | null = null;

function getCalculator(): MeshCalculator {
  if (loadedCalculator === null) {
    const message = loadError
      ? `Mesh calculator failed to load: ${loadError.message}`
      : "Mesh calculator not yet initialized. Ensure initializationPromise is awaited before using meshCalculator.";
    throw new Error(message);
  }
  return loadedCalculator;
}

async function loadMeshCalculatorModule(): Promise<MeshCalculator | null> {
  const logicType = typeof LOGIC_TYPE !== "undefined" ? LOGIC_TYPE : undefined;
  const moduleName = logicType
    ? `waffle-map-mesh-calculator-${logicType}`
    : "waffle-map-mesh-calculator-basic";

  try {
    const module = logicType
      ? await import(/* @vite-ignore */ `waffle-map-mesh-calculator-${logicType}`)
      : await import("waffle-map-mesh-calculator-basic");
    return module.default ?? module;
  } catch (error) {
    const fullError = new Error(
      `Failed to load mesh calculator module "${moduleName}": ${error instanceof Error ? error.message : String(error)}`,
    );
    console.error("[calculateMesh] Dynamic import failed:", fullError);
    console.error("[calculateMesh] Original error:", error);
    loadError = fullError;
    return null;
  }
}

export function initializeMeshCalculator(): Promise<boolean> {
  if (initPromise) {
    return initPromise;
  }

  initPromise = loadMeshCalculatorModule().then((calculator) => {
    if (calculator) {
      loadedCalculator = calculator;
      return true;
    }
    return false;
  });

  return initPromise;
}

export const initializationPromise: Promise<boolean> = initializeMeshCalculator();

export function getInitializationError(): Error | null {
  return loadError;
}

export function isInitialized(): boolean {
  return loadedCalculator !== null;
}

const meshCalculator: MeshCalculator = {
  get SCALES() {
    return getCalculator().SCALES;
  },
  toCenterLatLng(meshCode: string) {
    return getCalculator().toCenterLatLng(meshCode);
  },
  toBounds(meshCode: string) {
    return getCalculator().toBounds(meshCode);
  },
  toMeshCode(lat: number, lng: number, scale: number) {
    return getCalculator().toMeshCode(lat, lng, scale);
  },
  scaleFrom(zoom: number) {
    return getCalculator().scaleFrom(zoom);
  },
  offset(meshCode: string, x: number, y: number) {
    return getCalculator().offset(meshCode, x, y);
  },
};

export default meshCalculator;

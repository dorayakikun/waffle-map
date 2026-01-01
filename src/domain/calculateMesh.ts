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

/** Cached calculator instance */
let loadedCalculator: MeshCalculator | null = null;
let loadError: Error | null = null;
let initPromise: Promise<boolean> | null = null;

/**
 * Creates a fallback mesh calculator that logs errors when used.
 * This prevents the app from crashing while indicating that the
 * real calculator failed to load.
 */
function createFallbackCalculator(): MeshCalculator {
  const errorMessage = loadError
    ? `Mesh calculator failed to load: ${loadError.message}`
    : "Mesh calculator not yet initialized";

  const throwError = (): never => {
    throw new Error(errorMessage);
  };

  return {
    SCALES: [],
    toCenterLatLng: throwError,
    toBounds: throwError,
    toMeshCode: throwError,
    scaleFrom: throwError,
    offset: throwError,
  };
}

/**
 * Loads the mesh calculator module with error handling.
 * Returns the loaded module or null on failure.
 */
async function loadMeshCalculatorModule(): Promise<MeshCalculator | null> {
  const moduleName = LOGIC_TYPE
    ? `waffle-map-mesh-calculator-${LOGIC_TYPE}`
    : "waffle-map-mesh-calculator-basic";

  try {
    const module = LOGIC_TYPE
      ? await import(/* @vite-ignore */ `waffle-map-mesh-calculator-${LOGIC_TYPE}`)
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

/**
 * Initializes the mesh calculator. Safe to call multiple times -
 * subsequent calls return the cached promise.
 *
 * @returns Promise that resolves to true if initialization succeeded,
 *          false if it failed (fallback will be used)
 */
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

/**
 * Promise that resolves when initialization is complete.
 * Resolves to true if successful, false if failed.
 */
export const initializationPromise: Promise<boolean> = initializeMeshCalculator();

/**
 * Returns the initialization error if one occurred.
 */
export function getInitializationError(): Error | null {
  return loadError;
}

/**
 * Returns true if the mesh calculator loaded successfully.
 */
export function isInitialized(): boolean {
  return loadedCalculator !== null;
}

/**
 * Proxy object that lazily accesses the mesh calculator.
 * If initialization failed, methods will throw descriptive errors.
 */
const meshCalculator: MeshCalculator = {
  get SCALES() {
    return loadedCalculator?.SCALES ?? createFallbackCalculator().SCALES;
  },
  toCenterLatLng(meshCode: string) {
    if (!loadedCalculator) {
      return createFallbackCalculator().toCenterLatLng(meshCode);
    }
    return loadedCalculator.toCenterLatLng(meshCode);
  },
  toBounds(meshCode: string) {
    if (!loadedCalculator) {
      return createFallbackCalculator().toBounds(meshCode);
    }
    return loadedCalculator.toBounds(meshCode);
  },
  toMeshCode(lat: number, lng: number, scale: number) {
    if (!loadedCalculator) {
      return createFallbackCalculator().toMeshCode(lat, lng, scale);
    }
    return loadedCalculator.toMeshCode(lat, lng, scale);
  },
  scaleFrom(zoom: number) {
    if (!loadedCalculator) {
      return createFallbackCalculator().scaleFrom(zoom);
    }
    return loadedCalculator.scaleFrom(zoom);
  },
  offset(meshCode: string, x: number, y: number) {
    if (!loadedCalculator) {
      return createFallbackCalculator().offset(meshCode, x, y);
    }
    return loadedCalculator.offset(meshCode, x, y);
  },
};

export default meshCalculator;

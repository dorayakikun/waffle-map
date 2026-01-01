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
 * Gets the initialized calculator or throws a clear error.
 * @throws Error if initialization has not completed or failed
 */
function getCalculator(): MeshCalculator {
  if (loadedCalculator === null) {
    const message = loadError
      ? `Mesh calculator failed to load: ${loadError.message}`
      : "Mesh calculator not yet initialized. Ensure initializationPromise is awaited before using meshCalculator.";
    throw new Error(message);
  }
  return loadedCalculator;
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
 *          false if it failed
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
 *
 * IMPORTANT: This promise MUST be awaited in the app bootstrap (src/index.tsx)
 * before rendering any components that use meshCalculator. This ensures all
 * consumers can safely use meshCalculator methods synchronously.
 *
 * @example
 * // In app bootstrap:
 * await initializationPromise;
 * // Now safe to render components that use meshCalculator
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
 * Mesh calculator proxy that provides access to mesh calculation functions.
 *
 * IMPORTANT: The app must await initializationPromise before using this object.
 * If methods are called before initialization, they will throw a clear error.
 *
 * The initialization is enforced at app bootstrap (src/index.tsx), so consumers
 * (stores, components) can safely use this object synchronously.
 */
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

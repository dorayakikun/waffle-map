import { createToggleStore } from "./createToggleStore";

// Create mesh toggle store using the generic factory
const meshToggleStore = createToggleStore("enableMeshGrid", false);

// Export the store and hooks with original names for backward compatibility
export const useMeshToggleStore = meshToggleStore.useStore;
export const useMeshToggleState = meshToggleStore.useState;
export const useMeshToggleActions = meshToggleStore.useActions;
export const useMeshToggleEnableMeshGrid = meshToggleStore.useValue;

// Export types for backward compatibility
export type MeshToggleState = {
  enableMeshGrid: boolean;
};

export type MeshToggleActions = {
  setEnableMeshGrid: (enableMeshGrid: boolean) => void;
};

export type MeshToggleStore = MeshToggleState & MeshToggleActions;

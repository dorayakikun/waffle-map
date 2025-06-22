import { create } from 'zustand';

export type MeshToggleState = {
  enableMeshGrid: boolean;
};

export type MeshToggleActions = {
  setEnableMeshGrid: (enableMeshGrid: boolean) => void;
};

export type MeshToggleStore = MeshToggleState & MeshToggleActions;

const initialState: MeshToggleState = {
  enableMeshGrid: false,
};

export const useMeshToggleStore = create<MeshToggleStore>((set) => ({
  ...initialState,
  
  setEnableMeshGrid: (enableMeshGrid: boolean) =>
    set((state) => ({
      ...state,
      enableMeshGrid,
    })),
}));

// Selector hooks for optimized re-renders
export const useMeshToggleState = () =>
  useMeshToggleStore((state) => ({
    enableMeshGrid: state.enableMeshGrid,
  }));

export const useMeshToggleActions = () =>
  useMeshToggleStore((state) => ({
    setEnableMeshGrid: state.setEnableMeshGrid,
  }));

// Individual field selectors for even more granular updates
export const useMeshToggleEnableMeshGrid = () =>
  useMeshToggleStore((state) => state.enableMeshGrid);
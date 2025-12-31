import { create } from "zustand";

type MeshToggleState = {
	enableMeshGrid: boolean;
	setEnableMeshGrid: (enable: boolean) => void;
};

export const useMeshToggleStore = create<MeshToggleState>((set) => ({
	enableMeshGrid: false,
	setEnableMeshGrid: (enableMeshGrid) => set({ enableMeshGrid }),
}));

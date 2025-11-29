import { create } from "zustand";

type State = {
    enableMeshGrid: boolean;
};

type Actions = {
    setEnableMeshGrid: (enableMeshGrid: boolean) => void;
};

export const useMeshToggleStore = create<State & Actions>((set) => ({
    enableMeshGrid: false,
    setEnableMeshGrid: (enableMeshGrid) => set({ enableMeshGrid }),
}));

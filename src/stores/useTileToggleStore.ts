import { create } from "zustand";

type State = {
    enableTileGrid: boolean;
};

type Actions = {
    setEnableTileGrid: (enableTileGrid: boolean) => void;
};

export const useTileToggleStore = create<State & Actions>((set) => ({
    enableTileGrid: false,
    setEnableTileGrid: (enableTileGrid) => set({ enableTileGrid }),
}));

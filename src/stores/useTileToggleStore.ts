import { create } from "zustand";

type TileToggleState = {
	enableTileGrid: boolean;
	setEnableTileGrid: (enable: boolean) => void;
};

export const useTileToggleStore = create<TileToggleState>((set) => ({
	enableTileGrid: false,
	setEnableTileGrid: (enableTileGrid) => set({ enableTileGrid }),
}));

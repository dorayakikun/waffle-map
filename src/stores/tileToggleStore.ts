import { createToggleStore } from "./createToggleStore";

// Create tile toggle store using the generic factory
const tileToggleStore = createToggleStore("enableTileGrid", false);

// Export the store and hooks with original names for backward compatibility
export const useTileToggleStore = tileToggleStore.useStore;
export const useTileToggleState = tileToggleStore.useState;
export const useTileToggleActions = tileToggleStore.useActions;
export const useTileToggleEnableTileGrid = tileToggleStore.useValue;

// Export types for backward compatibility
export type TileToggleState = {
  enableTileGrid: boolean;
};

export type TileToggleActions = {
  setEnableTileGrid: (enableTileGrid: boolean) => void;
};

export type TileToggleStore = TileToggleState & TileToggleActions;

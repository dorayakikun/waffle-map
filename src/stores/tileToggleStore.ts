import { create } from 'zustand';

export type TileToggleState = {
  enableTileGrid: boolean;
};

export type TileToggleActions = {
  setEnableTileGrid: (enableTileGrid: boolean) => void;
};

export type TileToggleStore = TileToggleState & TileToggleActions;

const initialState: TileToggleState = {
  enableTileGrid: false,
};

export const useTileToggleStore = create<TileToggleStore>((set) => ({
  ...initialState,
  
  setEnableTileGrid: (enableTileGrid: boolean) =>
    set((state) => ({
      ...state,
      enableTileGrid,
    })),
}));

// Selector hooks for optimized re-renders
export const useTileToggleState = () => {
  const enableTileGrid = useTileToggleStore((state) => state.enableTileGrid);
  return { enableTileGrid };
};

export const useTileToggleActions = () => {
  const setEnableTileGrid = useTileToggleStore((state) => state.setEnableTileGrid);
  return { setEnableTileGrid };
};

// Individual field selectors for even more granular updates
export const useTileToggleEnableTileGrid = () =>
  useTileToggleStore((state) => state.enableTileGrid);
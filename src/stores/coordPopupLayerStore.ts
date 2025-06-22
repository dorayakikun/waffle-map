import { create } from 'zustand';
import { LatLng } from '../domain/calculateMesh';

export type CoordPopupLayerState = {
  position?: LatLng;
};

export type CoordPopupLayerActions = {
  setPosition: (position: LatLng) => void;
};

export type CoordPopupLayerStore = CoordPopupLayerState & CoordPopupLayerActions;

const initialState: CoordPopupLayerState = {
  position: undefined,
};

export const useCoordPopupLayerStore = create<CoordPopupLayerStore>((set) => ({
  ...initialState,
  
  setPosition: (position: LatLng) =>
    set((state) => ({
      ...state,
      position,
    })),
}));

// Selector hooks for optimized re-renders
export const useCoordPopupLayerState = () => {
  const position = useCoordPopupLayerStore((state) => state.position);
  return { position };
};

export const useCoordPopupLayerActions = () => {
  const setPosition = useCoordPopupLayerStore((state) => state.setPosition);
  return { setPosition };
};

// Individual field selectors for even more granular updates
export const useCoordPopupLayerPosition = () =>
  useCoordPopupLayerStore((state) => state.position);
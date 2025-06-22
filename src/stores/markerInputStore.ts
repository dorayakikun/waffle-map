import { create } from 'zustand';
import { LatLng } from '../domain/calculateMesh';
import { createLatLng } from '../domain/convertLatLng';

export type MarkerInputState = {
  latLngString: string;
  errorMessage: string;
  positions: LatLng[];
};

export type MarkerInputActions = {
  inputLatLng: (latLngString: string) => void;
  putMarker: (unit: string) => void;
  removeAllMarkers: () => void;
};

export type MarkerInputStore = MarkerInputState & MarkerInputActions;

const initialState: MarkerInputState = {
  latLngString: "",
  errorMessage: "",
  positions: [],
};

export const useMarkerInputStore = create<MarkerInputStore>((set, get) => ({
  ...initialState,
  
  inputLatLng: (latLngString: string) =>
    set((state) => ({
      ...state,
      latLngString,
    })),
    
  putMarker: (unit: string) =>
    set((state) => {
      try {
        const newPosition = createLatLng(state.latLngString, unit);
        return {
          ...state,
          errorMessage: "",
          positions: [...state.positions, newPosition],
        };
      } catch (e) {
        return {
          ...state,
          errorMessage: e instanceof Error ? e.message : String(e),
        };
      }
    }),
    
  removeAllMarkers: () =>
    set((state) => ({
      ...state,
      positions: [],
    })),
}));

// Selector hooks for optimized re-renders
export const useMarkerInputState = () => {
  const latLngString = useMarkerInputStore((state) => state.latLngString);
  const errorMessage = useMarkerInputStore((state) => state.errorMessage);
  const positions = useMarkerInputStore((state) => state.positions);
  return { latLngString, errorMessage, positions };
};

export const useMarkerInputActions = () => {
  const inputLatLng = useMarkerInputStore((state) => state.inputLatLng);
  const putMarker = useMarkerInputStore((state) => state.putMarker);
  const removeAllMarkers = useMarkerInputStore((state) => state.removeAllMarkers);
  return { inputLatLng, putMarker, removeAllMarkers };
};

// Individual field selectors for even more granular updates
export const useMarkerInputLatLngString = () =>
  useMarkerInputStore((state) => state.latLngString);

export const useMarkerInputErrorMessage = () =>
  useMarkerInputStore((state) => state.errorMessage);

export const useMarkerInputPositions = () =>
  useMarkerInputStore((state) => state.positions);
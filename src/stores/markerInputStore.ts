import { create } from "zustand";
import { LatLng } from "../domain/calculateMesh";
import { createLatLng } from "../domain/convertLatLng";

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

export const useMarkerInputStore = create<MarkerInputStore>((set) => ({
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

// Individual field selectors for optimized re-renders
export const useMarkerInputLatLngString = () => useMarkerInputStore((state) => state.latLngString);
export const useMarkerInputErrorMessage = () => useMarkerInputStore((state) => state.errorMessage);
export const useMarkerInputPositions = () => useMarkerInputStore((state) => state.positions);
export const useMarkerInputInputLatLng = () => useMarkerInputStore((state) => state.inputLatLng);
export const useMarkerInputPutMarker = () => useMarkerInputStore((state) => state.putMarker);
export const useMarkerInputRemoveAllMarkers = () => useMarkerInputStore((state) => state.removeAllMarkers);

import { create } from 'zustand';

export type GeodeticInputState = {
  unit: string;
  datum: string;
};

export type GeodeticInputActions = {
  changeDatum: (datum: string) => void;
  changeUnit: (unit: string) => void;
};

export type GeodeticInputStore = GeodeticInputState & GeodeticInputActions;

const initialState: GeodeticInputState = {
  datum: "WGS84",
  unit: "degree",
};

export const useGeodeticInputStore = create<GeodeticInputStore>((set) => ({
  ...initialState,
  
  changeDatum: (datum: string) =>
    set((state) => ({
      ...state,
      datum,
    })),
    
  changeUnit: (unit: string) =>
    set((state) => ({
      ...state,
      unit,
    })),
}));

// Selector hooks for optimized re-renders
export const useGeodeticInputState = () =>
  useGeodeticInputStore((state) => ({
    unit: state.unit,
    datum: state.datum,
  }));

export const useGeodeticInputActions = () =>
  useGeodeticInputStore((state) => ({
    changeDatum: state.changeDatum,
    changeUnit: state.changeUnit,
  }));

// Individual field selectors for even more granular updates
export const useGeodeticInputUnit = () =>
  useGeodeticInputStore((state) => state.unit);

export const useGeodeticInputDatum = () =>
  useGeodeticInputStore((state) => state.datum);
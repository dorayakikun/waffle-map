import { create } from "zustand";
import { Datum, Unit } from "../types";

export type GeodeticInputState = {
  unit: Unit;
  datum: Datum;
};

export type GeodeticInputActions = {
  changeDatum: (datum: Datum) => void;
  changeUnit: (unit: Unit) => void;
};

export type GeodeticInputStore = GeodeticInputState & GeodeticInputActions;

const initialState: GeodeticInputState = {
  datum: "WGS84",
  unit: "degree",
};

export const useGeodeticInputStore = create<GeodeticInputStore>((set) => ({
  ...initialState,

  changeDatum: (datum: Datum) => set({ datum }),
  changeUnit: (unit: Unit) => set({ unit }),
}));

// Individual field selectors for optimized re-renders
export const useGeodeticInputUnit = () => useGeodeticInputStore((state) => state.unit);
export const useGeodeticInputDatum = () => useGeodeticInputStore((state) => state.datum);
export const useGeodeticInputChangeDatum = () => useGeodeticInputStore((state) => state.changeDatum);
export const useGeodeticInputChangeUnit = () => useGeodeticInputStore((state) => state.changeUnit);

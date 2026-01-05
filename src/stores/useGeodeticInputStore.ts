import { create } from "zustand";
import type { Datum, Unit } from "../types";

type GeodeticInputState = {
  unit: Unit;
  datum: Datum;
  changeDatum: (datum: Datum) => void;
  changeUnit: (unit: Unit) => void;
};

export const useGeodeticInputStore = create<GeodeticInputState>((set) => ({
  datum: "WGS84",
  unit: "degree",
  changeDatum: (datum) => set({ datum }),
  changeUnit: (unit) => set({ unit }),
}));

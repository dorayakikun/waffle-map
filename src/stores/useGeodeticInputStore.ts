import { create } from "zustand";

type GeodeticInputState = {
	unit: string;
	datum: string;
	changeDatum: (datum: string) => void;
	changeUnit: (unit: string) => void;
};

export const useGeodeticInputStore = create<GeodeticInputState>((set) => ({
	datum: "WGS84",
	unit: "degree",
	changeDatum: (datum) => set({ datum }),
	changeUnit: (unit) => set({ unit }),
}));

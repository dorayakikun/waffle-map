import { create } from "zustand";

type State = {
    unit: string;
    datum: string;
};

type Actions = {
    changeDatum: (datum: string) => void;
    changeUnit: (unit: string) => void;
};

export const useGeodeticInputStore = create<State & Actions>((set) => ({
    datum: "WGS84",
    unit: "degree",
    changeDatum: (datum) => set({ datum }),
    changeUnit: (unit) => set({ unit }),
}));

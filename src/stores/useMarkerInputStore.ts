import { create } from "zustand";
import { createLatLng } from "../domain/convertLatLng";
import { LatLng } from "../domain/calculateMesh";

type State = {
    latLngString: string;
    errorMessage: string;
    positions: LatLng[];
};

type Actions = {
    inputLatLng: (latLngString: string) => void;
    putMarker: (unit: string) => void;
    removeAllMarkers: () => void;
};

export const useMarkerInputStore = create<State & Actions>((set, get) => ({
    latLngString: "",
    errorMessage: "",
    positions: [],
    inputLatLng: (latLngString) => set({ latLngString }),
    putMarker: (unit) => {
        const { latLngString, positions } = get();
        try {
            set({
                errorMessage: "",
                positions: [...positions, createLatLng(latLngString, unit)],
            });
        } catch (e: any) {
            set({ errorMessage: e.message });
        }
    },
    removeAllMarkers: () => set({ positions: [] }),
}));

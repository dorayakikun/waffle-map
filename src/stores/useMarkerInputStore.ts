import { create } from "zustand";
import type { LatLng } from "../domain/calculateMesh";
import { createLatLng } from "../domain/convertLatLng";

type MarkerInputState = {
	latLngString: string;
	errorMessage: string;
	positions: LatLng[];
	inputLatLng: (latLngString: string) => void;
	putMarker: (unit: string) => void;
	removeAllMarkers: () => void;
};

export const useMarkerInputStore = create<MarkerInputState>((set, get) => ({
	latLngString: "",
	errorMessage: "",
	positions: [],
	inputLatLng: (latLngString) => set({ latLngString }),
	putMarker: (unit) => {
		try {
			const { latLngString, positions } = get();
			set({
				errorMessage: "",
				positions: [...positions, createLatLng(latLngString, unit)],
			});
		} catch (e) {
			set({
				errorMessage: e instanceof Error ? e.message : String(e),
			});
		}
	},
	removeAllMarkers: () => set({ positions: [] }),
}));

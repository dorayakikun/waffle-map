import { create } from "zustand";
import type { LatLng } from "../domain/calculateMesh";

type CoordPopupState = {
	position?: LatLng;
	setPosition: (position: LatLng) => void;
};

export const useCoordPopupStore = create<CoordPopupState>((set) => ({
	position: undefined,
	setPosition: (position) => set({ position }),
}));

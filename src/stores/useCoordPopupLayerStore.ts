import { create } from "zustand";
import { LatLng } from "../domain/calculateMesh";

type State = {
    position?: LatLng;
};

type Actions = {
    setPosition: (position: LatLng) => void;
};

export const useCoordPopupLayerStore = create<State & Actions>((set) => ({
    position: undefined,
    setPosition: (position) => set({ position }),
}));

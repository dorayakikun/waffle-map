import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { LatLng } from "../domain/calculateMesh";
import { safeCreateLatLng } from "../domain/convertLatLng";
import type { LatLngError } from "../errors";
import { formatLatLngError } from "../errors";
import type { Unit } from "../types";
import { err, type Result } from "../types/result";

type AddMarkerResult = Result<LatLng, LatLngError>;

type MarkerInputState = {
  latLngString: string;
  errorMessage: string;
  positions: LatLng[];

  lastResult: AddMarkerResult | null;

  inputLatLng: (latLngString: string) => void;
  putMarker: (unit: Unit) => void;
  removeAllMarkers: () => void;
  removeMarker: (index: number) => void;
  clearError: () => void;
};

export const useMarkerInputStore = create<MarkerInputState>()(
  subscribeWithSelector((set, get) => ({
    latLngString: "",
    errorMessage: "",
    positions: [],
    lastResult: null,

    inputLatLng: (latLngString) => set({ latLngString, errorMessage: "" }),

    putMarker: (unit) => {
      const { latLngString, positions } = get();

      if (!latLngString.trim()) {
        set({
          errorMessage: "Please enter coordinates",
          lastResult: err({
            code: "LATLNG_PARSE_FAILED",
            input: latLngString,
            reason: "Empty input",
          }),
        });
        return;
      }

      const result = safeCreateLatLng(latLngString, unit);

      if (result.isOk()) {
        set({
          errorMessage: "",
          positions: [...positions, result.value],
          lastResult: result,
          latLngString: "",
        });
      } else {
        set({
          errorMessage: formatLatLngError(result.error),
          lastResult: result,
        });
      }
    },

    removeAllMarkers: () =>
      set({
        positions: [],
        errorMessage: "",
        lastResult: null,
      }),

    removeMarker: (index) => {
      const { positions } = get();
      if (index >= 0 && index < positions.length) {
        set({
          positions: positions.filter((_, i) => i !== index),
        });
      }
    },

    clearError: () => set({ errorMessage: "", lastResult: null }),
  })),
);

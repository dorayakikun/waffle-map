import { create } from "zustand";
import { Meshcode, Separator } from "../types";
import meshCalculator, { Mesh } from "../domain/calculateMesh";

export type MeshcodesInputState = {
  errorMessage: string;
  meshcodesString: string;
  separator: Separator;
  meshcodes: Meshcode[];
  userInputMeshes: Record<Meshcode, Mesh>;
};

export type MeshcodesInputActions = {
  inputMeshcodesString: (meshcodesString: string) => void;
  changeSeparator: (separator: Separator) => void;
};

export type MeshcodesInputStore = MeshcodesInputState & MeshcodesInputActions;

const { toBounds, toCenterLatLng } = meshCalculator;

function mapToMeshes(meshcodes: Meshcode[]): Record<Meshcode, Mesh> {
  return Object.fromEntries(
    meshcodes.map((meshcode) => {
      return [
        meshcode,
        {
          bounds: toBounds(meshcode),
          center: toCenterLatLng(meshcode),
          code: meshcode,
        },
      ];
    }),
  );
}

const initialState: MeshcodesInputState = {
  errorMessage: "",
  meshcodesString: "",
  separator: ".",
  meshcodes: [],
  userInputMeshes: {},
};

export const useMeshcodesInputStore = create<MeshcodesInputStore>((set) => ({
  ...initialState,

  changeSeparator: (separator: Separator) => set({ separator }),

  inputMeshcodesString: (meshcodesString: string) =>
    set((state) => {
      const meshcodes = meshcodesString
        .split(state.separator)
        .filter((meshCode) => meshCode !== "");

      try {
        return {
          ...state,
          errorMessage: "",
          meshcodesString,
          meshcodes,
          userInputMeshes: mapToMeshes(meshcodes),
        };
      } catch (e) {
        return {
          ...state,
          errorMessage: e instanceof Error ? e.message : String(e),
          meshcodesString,
          meshcodes: [],
          userInputMeshes: {},
        };
      }
    }),
}));

// Individual field selectors for optimized re-renders
export const useMeshcodesInputErrorMessage = () =>
  useMeshcodesInputStore((state) => state.errorMessage);
export const useMeshcodesInputMeshcodesString = () =>
  useMeshcodesInputStore((state) => state.meshcodesString);
export const useMeshcodesInputSeparator = () => useMeshcodesInputStore((state) => state.separator);
export const useMeshcodesInputMeshcodes = () => useMeshcodesInputStore((state) => state.meshcodes);
export const useMeshcodesInputUserInputMeshes = () =>
  useMeshcodesInputStore((state) => state.userInputMeshes);
export const useMeshcodesInputInputMeshcodesString = () => useMeshcodesInputStore((state) => state.inputMeshcodesString);
export const useMeshcodesInputChangeSeparator = () => useMeshcodesInputStore((state) => state.changeSeparator);

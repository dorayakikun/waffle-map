import { create } from "zustand";
import { Meshcode, Separator } from "../types";
import { getMeshCalculator, Mesh } from "../domain/calculateMesh";

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

async function mapToMeshes(meshcodes: Meshcode[]): Promise<Record<Meshcode, Mesh>> {
  const meshCalculator = await getMeshCalculator();
  const { toBounds, toCenterLatLng } = meshCalculator;
  
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

  inputMeshcodesString: (meshcodesString: string) => {
    const meshcodes = meshcodesString
      .split(useMeshcodesInputStore.getState().separator)
      .filter((meshCode) => meshCode !== "");

    // Set immediate state with loading indicator
    set({
      errorMessage: "",
      meshcodesString,
      meshcodes,
      userInputMeshes: {}, // Clear previous meshes while loading
    });

    // Load meshes asynchronously
    mapToMeshes(meshcodes)
      .then((userInputMeshes) => {
        set({ userInputMeshes });
      })
      .catch((e) => {
        set({
          errorMessage: e instanceof Error ? e.message : String(e),
          meshcodes: [],
          userInputMeshes: {},
        });
      });
  },
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

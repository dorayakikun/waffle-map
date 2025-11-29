import { create } from "zustand";
import { Meshcode } from "../types";
import meshCalculator, { Mesh } from "../domain/calculateMesh";

type State = {
    errorMessage: string;
    meshcodesString: string;
    separator: string;
    meshcodes: Meshcode[];
    userInputMeshes: Record<Meshcode, Mesh>;
};

type Actions = {
    inputMeshcodesString: (meshcodesString: string) => void;
    changeSeparator: (separator: string) => void;
};

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

export const useMeshcodesInputStore = create<State & Actions>((set, get) => ({
    errorMessage: "",
    meshcodesString: "",
    separator: ".",
    meshcodes: [],
    userInputMeshes: {},
    inputMeshcodesString: (meshcodesString) => {
        const { separator } = get();
        const meshcodes = meshcodesString
            .split(separator)
            .filter((meshCode) => meshCode !== "");
        try {
            set({
                errorMessage: "",
                meshcodesString,
                meshcodes,
                userInputMeshes: mapToMeshes(meshcodes),
            });
        } catch (e: any) {
            set({
                errorMessage: e.message,
                meshcodesString,
                meshcodes: [],
                userInputMeshes: {},
            });
        }
    },
    changeSeparator: (separator) => set({ separator }),
}));

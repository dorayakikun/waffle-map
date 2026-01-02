import { create } from "zustand";
import meshCalculator, { type Mesh } from "../domain/calculateMesh";
import type { Meshcode } from "../types";

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

type MeshcodesInputState = {
	errorMessage: string;
	meshcodesString: string;
	separator: string;
	meshcodes: Meshcode[];
	userInputMeshes: Record<Meshcode, Mesh>;
	changeSeparator: (separator: string) => void;
	inputMeshcodesString: (meshcodesString: string) => void;
	setMeshcodesFromUrl: (meshcodes: Meshcode[], separator: string) => void;
};

export const useMeshcodesInputStore = create<MeshcodesInputState>((set, get) => ({
	errorMessage: "",
	meshcodesString: "",
	separator: ".",
	meshcodes: [],
	userInputMeshes: {},
	changeSeparator: (separator) => set({ separator }),
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
		} catch (e) {
			set({
				errorMessage: e instanceof Error ? e.message : String(e),
				meshcodesString,
				meshcodes: [],
				userInputMeshes: {},
			});
		}
	},
	setMeshcodesFromUrl: (meshcodes, separator) => {
		try {
			set({
				errorMessage: "",
				separator,
				meshcodesString: meshcodes.join(separator),
				meshcodes,
				userInputMeshes: mapToMeshes(meshcodes),
			});
		} catch (e) {
			set({
				errorMessage: e instanceof Error ? e.message : String(e),
				separator,
				meshcodesString: "",
				meshcodes: [],
				userInputMeshes: {},
			});
		}
	},
}));

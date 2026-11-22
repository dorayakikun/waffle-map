import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import meshCalculator, { type Mesh } from "../domain/calculateMesh";
import type { MeshcodeError } from "../errors";
import { formatMeshcodeError } from "../errors";
import type { Meshcode, Separator } from "../types";
import { err, ok, type Result } from "../types/result";

const { toBounds, toCenterLatLng } = meshCalculator;

type ParseMeshesResult = Result<
  { meshes: Record<Meshcode, Mesh>; meshcodes: Meshcode[] },
  MeshcodeError
>;

function parseMeshcodes(input: string, separator: Separator): ParseMeshesResult {
  const codes = input
    .split(separator)
    .map((s) => s.trim())
    .filter(Boolean) as Meshcode[];

  try {
    const meshes: Record<Meshcode, Mesh> = {};

    for (const code of codes) {
      const bounds = toBounds(code);
      const center = toCenterLatLng(code);
      meshes[code] = { bounds, center, code };
    }

    return ok({ meshes, meshcodes: codes });
  } catch {
    return err({
      code: "MESHCODE_PARSE_FAILED",
      input,
      separator,
    });
  }
}

type MeshcodesInputState = {
  meshcodesString: string;
  separator: Separator;
  meshcodes: Meshcode[];
  userInputMeshes: Record<Meshcode, Mesh>;
  errorMessage: string;

  parseResult: ParseMeshesResult;

  changeSeparator: (separator: Separator) => void;
  inputMeshcodesString: (meshcodesString: string) => void;
  setMeshcodesFromUrl: (meshcodes: Meshcode[], separator: Separator) => void;
};

export const useMeshcodesInputStore = create<MeshcodesInputState>()(
  subscribeWithSelector((set, get) => ({
    meshcodesString: "",
    separator: ".",
    meshcodes: [],
    userInputMeshes: {},
    errorMessage: "",
    parseResult: ok({ meshes: {}, meshcodes: [] }),

    changeSeparator: (separator) => {
      const { meshcodesString } = get();
      const parseResult = parseMeshcodes(meshcodesString, separator);

      set({
        separator,
        parseResult,
        meshcodes: parseResult.isOk() ? parseResult.value.meshcodes : [],
        userInputMeshes: parseResult.isOk() ? parseResult.value.meshes : {},
        errorMessage: parseResult.isErr() ? formatMeshcodeError(parseResult.error) : "",
      });
    },

    inputMeshcodesString: (meshcodesString) => {
      const { separator } = get();
      const parseResult = parseMeshcodes(meshcodesString, separator);

      set({
        meshcodesString,
        parseResult,
        meshcodes: parseResult.isOk() ? parseResult.value.meshcodes : [],
        userInputMeshes: parseResult.isOk() ? parseResult.value.meshes : {},
        errorMessage: parseResult.isErr() ? formatMeshcodeError(parseResult.error) : "",
      });
    },

    setMeshcodesFromUrl: (meshcodes, separator) => {
      const meshcodesString = meshcodes.join(separator);
      const parseResult = parseMeshcodes(meshcodesString, separator);

      set({
        meshcodesString,
        separator,
        parseResult,
        meshcodes: parseResult.isOk() ? parseResult.value.meshcodes : [],
        userInputMeshes: parseResult.isOk() ? parseResult.value.meshes : {},
        errorMessage: parseResult.isErr() ? formatMeshcodeError(parseResult.error) : "",
      });
    },
  })),
);

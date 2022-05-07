import { useCallback, useReducer } from "react";
import { Meshcode } from "../../types";
import meshCalculator, { Mesh } from "../../domain/calculateMesh";

enum ActionKeys {
  CHANGE_SEPARATOR = "mesh_codes/change_separator",
  INPUT_MESH_CODES = "mesh_codes/input_mesh_codes",
}

type ChangeSeparatorAction = {
  type: ActionKeys.CHANGE_SEPARATOR;
  payload: { separator: string };
};

type InputMeshCodesAction = {
  type: ActionKeys.INPUT_MESH_CODES;
  payload: { meshcodesString: string };
};

type Action = ChangeSeparatorAction | InputMeshCodesAction;

export type State = {
  errorMessage: string;
  meshcodesString: string;
  separator: string;
  meshcodes: Meshcode[];
  userInputMeshes: Record<Meshcode, Mesh>;
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

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionKeys.CHANGE_SEPARATOR:
      return { ...state, separator: action.payload.separator };
    case ActionKeys.INPUT_MESH_CODES: {
      const { meshcodesString } = action.payload;
      const meshcodes = meshcodesString
        .split(state.separator)
        .filter((meshCode) => meshCode !== "");
      try {
        return {
          ...state,
          errorMessage: "",
          meshcodesString: meshcodesString,
          meshcodes,
          userInputMeshes: mapToMeshes(meshcodes),
        };
      } catch (e) {
        return {
          ...state,
          errorMessage: e.message,
          meshcodesString: meshcodesString,
          meshcodes: [],
          userInputMeshes: {},
        };
      }
    }
    default:
      return state;
  }
}

const initialStateFactory = (initialState?: Partial<State>): State => ({
  errorMessage: "",
  meshcodesString: "",
  separator: ".",
  meshcodes: [],
  userInputMeshes: {},
  ...initialState,
});

export function useCoreMeshcodesInput(initialState?: Partial<State>) {
  const [state, dispatch] = useReducer(
    reducer,
    initialStateFactory(initialState),
  );

  const inputMeshcodesString = useCallback(
    (meshcodesString: string) => {
      dispatch({
        type: ActionKeys.INPUT_MESH_CODES,
        payload: { meshcodesString },
      });
    },
    [dispatch],
  );

  const changeSeparator = useCallback(
    (separator: string) => {
      dispatch({
        type: ActionKeys.CHANGE_SEPARATOR,
        payload: { separator },
      });
    },
    [dispatch],
  );

  return {
    state,
    inputMeshcodesString,
    changeSeparator,
  } as const;
}

export enum ActionKeys {
  CHANGE_ERROR_MESSAGE = "mesh_codes/change_error_message",
  CHANGE_SEPARATOR = "mesh_codes/change_separator",
  INPUT_MESH_CODES = "mesh_codes/input_mesh_codes",
}

interface ChangeErrorMessage {
  type: ActionKeys.CHANGE_ERROR_MESSAGE;
  payload: { errorMessage: string };
}
interface ChangeSeparatorAction {
  type: ActionKeys.CHANGE_SEPARATOR;
  payload: { separator: string };
}

interface InputMeshCodesAction {
  readonly type: ActionKeys.INPUT_MESH_CODES;
  payload: { meshCodes: string };
}

export type Action =
  | ChangeErrorMessage
  | ChangeSeparatorAction
  | InputMeshCodesAction;

export const changeErrorMessage = (
  errorMessage: string
): ChangeErrorMessage => ({
  payload: { errorMessage },
  type: ActionKeys.CHANGE_ERROR_MESSAGE,
});

export const changeSeparator = (separator: string): ChangeSeparatorAction => ({
  payload: { separator },
  type: ActionKeys.CHANGE_SEPARATOR,
});

export const inputMeshCodes = (meshCodes: string): InputMeshCodesAction => ({
  payload: { meshCodes },
  type: ActionKeys.INPUT_MESH_CODES,
});

import { Mesh } from "../domain/calculateMesh";

export enum ActionKeys {
  CHANGE_MESHES = "meshes/change_meshes",
}

interface ChangeMeshesAction {
  readonly type: ActionKeys.CHANGE_MESHES;
  payload: { meshes: Mesh[] };
}

export type Action = ChangeMeshesAction;

export const changeMeshes = (meshes: Mesh[]): ChangeMeshesAction => ({
  payload: { meshes },
  type: ActionKeys.CHANGE_MESHES,
});

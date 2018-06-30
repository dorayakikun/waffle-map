export enum ActionKeys {
  CREATE_MESHES = 'meshes/create_meshes',
}

interface CreateMeshesAction {
  readonly type: ActionKeys.CREATE_MESHES
  payload: { meshCodes: string; separator: string }
}

export type Action = CreateMeshesAction

export const createMeshes = (
  meshCodes: string,
  separator: string
): CreateMeshesAction => ({
  payload: { meshCodes, separator },
  type: ActionKeys.CREATE_MESHES,
})

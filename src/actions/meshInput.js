// @flow

export const INPUT_MESHES: string = 'INPUT_MESHES'
export type MeshInputAction = { type: typeof INPUT_MESHES, payload: string }

export const inputMeshes = (meshes: string): MeshInputAction => ({
  payload: meshes,
  type: INPUT_MESHES
})

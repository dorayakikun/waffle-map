// @flow

import type { SeparatorItem } from '../components/meshInput'

export const INPUT_MESHES = 'INPUT_MESHES'
export const SELECT_SEPARATOR = 'SELECT_SEPARATOR'

export type Action =
  | {
      type: typeof INPUT_MESHES,
      payload: {
        meshes: string
      }
    }
  | {
      type: typeof SELECT_SEPARATOR,
      payload: {
        separator: string
      }
    }

export const inputMeshes = (meshes: string): Action => ({
  type: INPUT_MESHES,
  payload: { meshes }
})

export const selectSeparator = (separator: string): Action => ({
  type: SELECT_SEPARATOR,
  payload: {
    separator
  }
})

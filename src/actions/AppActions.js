// @flow
import type { LatLng } from '../domain/calculateMesh'

export const INPUT_MESHES = 'INPUT_MESHES'
export const SELECT_SEPARATOR = 'SELECT_SEPARATOR'
export const TOGGLE_DEBUG_TILES = 'TOGGLE_DEBUG_TILES'
export const UPDATE_CONTEXTMENU_POSITION = 'UPDATE_CONTEXTMENU_POSITION'

export type Action =
  | {
      type: typeof INPUT_MESHES,
      payload: {
        meshCodes: string
      }
    }
  | {
      type: typeof SELECT_SEPARATOR,
      payload: {
        separator: string
      }
    }
  | {
      type: typeof TOGGLE_DEBUG_TILES,
      payload: {
        isShowDebugTiles: boolean
      }
    }
  | {
      type: typeof UPDATE_CONTEXTMENU_POSITION,
      payload: {
        latLng: ?LatLng
      }
    }

export const inputMeshes = (meshCodes: string): Action => ({
  type: INPUT_MESHES,
  payload: { meshCodes }
})

export const selectSeparator = (separator: string): Action => ({
  type: SELECT_SEPARATOR,
  payload: {
    separator
  }
})

export const toggleDebugTiles = (isShowDebugTiles: boolean): Action => ({
  type: TOGGLE_DEBUG_TILES,
  payload: {
    isShowDebugTiles
  }
})

export const updateContextmenuPosition = (latLng: ?LatLng): Action => ({
  type: UPDATE_CONTEXTMENU_POSITION,
  payload: {
    latLng
  }
})

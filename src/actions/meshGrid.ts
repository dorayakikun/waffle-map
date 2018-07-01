export enum ActionKeys {
  TOGGLE_VISIBLE = 'mesh_grid/toggle_visible',
}

interface ToggleVisibleAction {
  readonly type: ActionKeys.TOGGLE_VISIBLE
  payload: { isVisible: boolean }
}

export type Action =
  | ToggleVisibleAction

export const toggleMeshes = (isVisible: boolean): ToggleVisibleAction => ({
  payload: { isVisible },
  type: ActionKeys.TOGGLE_VISIBLE,
})
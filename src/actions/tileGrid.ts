export enum ActionKeys {
  TOGGLE_VISIBLE = "tile_grid/toggle_visible",
}

interface ToggleVisibleAction {
  readonly type: ActionKeys.TOGGLE_VISIBLE;
  payload: { isVisible: boolean };
}

export type Action = ToggleVisibleAction;

export const toggleVisible = (isVisible: boolean): ToggleVisibleAction => ({
  payload: { isVisible },
  type: ActionKeys.TOGGLE_VISIBLE,
});

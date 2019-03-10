import { LatLng } from "../domain/calculateMesh";

export enum ActionKeys {
  CONCAT_MARKER_POSITIONS = "map/concat_marker_positions",
  REMOVE_ALL_MARKERS = "map/remove_all_markers",
  UPDATE_CONTEXTMENU_POSITION = "map/update_contextmenu_position"
}

interface ConcatMarkerPositionsAction {
  readonly type: ActionKeys.CONCAT_MARKER_POSITIONS;
  payload: { position: LatLng };
}
interface RemoveAllMarkerAction {
  readonly type: ActionKeys.REMOVE_ALL_MARKERS;
}
interface UpdateContextmenuPositionAction {
  readonly type: ActionKeys.UPDATE_CONTEXTMENU_POSITION;
  payload: { latLng?: LatLng };
}

export type Action =
  | ConcatMarkerPositionsAction
  | RemoveAllMarkerAction
  | UpdateContextmenuPositionAction;

export const concatMarkerPositions = (
  position: LatLng
): ConcatMarkerPositionsAction => ({
  payload: { position },
  type: ActionKeys.CONCAT_MARKER_POSITIONS
});

export const removeAllMarkers = (): RemoveAllMarkerAction => ({
  type: ActionKeys.REMOVE_ALL_MARKERS
});

export const updateContextmenuPosition = (
  latLng?: LatLng
): UpdateContextmenuPositionAction => ({
  payload: { latLng },
  type: ActionKeys.UPDATE_CONTEXTMENU_POSITION
});

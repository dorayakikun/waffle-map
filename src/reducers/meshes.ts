import { Action, ActionKeys } from "../actions/meshes";
import meshCalculator, { Mesh } from "../domain/calculateMesh";

export const initialState: Mesh[] = [];

const { toBounds, toCenterLatLng } = meshCalculator;
export const mapToMeshes = (meshCodes: string, separator: string): Mesh[] =>
  meshCodes
    .split(separator)
    .filter(meshCode => meshCode !== "")
    .map(meshCode => ({
      bounds: toBounds(meshCode),
      center: toCenterLatLng(meshCode),
      code: meshCode
    }));

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionKeys.CHANGE_MESHES:
      return action.payload.meshes;
    default:
      return state;
  }
};

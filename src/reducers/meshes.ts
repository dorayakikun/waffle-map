import { Action, ActionKeys } from "../actions/meshes";
import meshCalculator, { Mesh } from "../domain/calculateMesh";

type State = Mesh[];
export const initialState: Mesh[] = [];

const { toBounds, toCenterLatLng } = meshCalculator;
export function mapToMeshes(meshCodes: string, separator: string): Mesh[] {
  return meshCodes
    .split(separator)
    .filter(meshCode => meshCode !== "")
    .map(meshCode => ({
      bounds: toBounds(meshCode),
      center: toCenterLatLng(meshCode),
      code: meshCode
    }));
}

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ActionKeys.CHANGE_MESHES:
      return action.payload.meshes;
    default:
      return state;
  }
}

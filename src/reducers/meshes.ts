import { Action, ActionKeys } from '../actions/meshes'
import meshCalculator, { Mesh } from '../domain/calculateMesh'

export interface State {
  meshes: Mesh[]
}

const { toBounds, toCenterLatLng } = meshCalculator
const mapToMeshes = (meshCodes: string, separator: string): Mesh[] =>
  meshCodes
    .split(separator)
    .filter(meshCode => meshCode !== '')
    .map(meshCode => ({
      bounds: toBounds(meshCode),
      center: toCenterLatLng(meshCode),
      code: meshCode,
    }))

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionKeys.CREATE_MESHES:
      return {
        meshes: mapToMeshes(action.payload.meshCodes, action.payload.separator),
      }
    default:
      return state
  }
}

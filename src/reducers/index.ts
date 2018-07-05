import { combineReducers } from 'redux'
import { Mesh } from '../domain/calculateMesh'
import { reducer as geodetic, State as GeodeticState } from './geodetic'
import { reducer as map, State as MapState } from './map'
import { reducer as markers, State as MarkersState } from './markers'
import { reducer as meshCodes, State as MeshCodesState } from './meshCodes'
import { reducer as meshes } from './meshes'
import { reducer as meshGrid, State as MeshGridState } from './meshGrid'
import { reducer as tileGrid, State as TileGridState } from './tileGrid'

export interface State {
  geodetic: GeodeticState
  markers: MarkersState
  meshCodes: MeshCodesState
  tileGrid: TileGridState
  meshGrid: MeshGridState
  meshes: Mesh[]
  map: MapState
}

export const getGeodetic = (state: State) => state.geodetic
export const getMeshCodes = (state: State) => state.meshCodes

export const reducers = combineReducers({
  geodetic,
  map,
  markers,
  meshCodes,
  meshGrid,
  meshes,
  tileGrid,
} as any)

import * as React from 'react'
import { connect } from 'react-redux'

import { MeshDetail } from '../components/MeshDetail'
import { Mesh } from '../domain/calculateMesh'
import {
  convertLatLngToMillisecIfNeeded,
  convertBoundsToMillisecIfNeeded,
  convertLatLngToTokyoIfNeeded,
  convertBoundsToTokyoIfNeeded,
} from '../domain/convertLatLng'
import { State as RootState } from '../reducers'

type MeshDetailsContainerProps = { meshes: Array<Mesh> }

const MeshContainer = ({ meshes }: MeshDetailsContainerProps) => (
  <div>{meshes.map((mesh, index) => <MeshDetail {...mesh} key={index} />)}</div>
)

const mapStateToProps = (state: RootState) => ({
  meshes: state.meshes.map(mesh => ({
    code: mesh.code,
    center: convertLatLngToMillisecIfNeeded(
      convertLatLngToTokyoIfNeeded(mesh.center, state.geodeticInput.datum),
      state.geodeticInput.unit
    ),
    bounds: convertBoundsToMillisecIfNeeded(
      convertBoundsToTokyoIfNeeded(mesh.bounds, state.geodeticInput.datum),
      state.geodeticInput.unit
    ),
  })),
})

const connector = connect(mapStateToProps, {})

export const MeshDetailsContainer = connector(MeshContainer)

import * as React from 'react'
import { connect } from 'react-redux'

import { MeshDetail } from '../components/MeshDetail'
import { Mesh } from '../domain/calculateMesh'
import {
  convertLatLngToMillisecIfNeeded,
  convertBoundsToMillisecIfNeeded,
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
      mesh.center,
      state.markerInput.unit
    ),
    bounds: convertBoundsToMillisecIfNeeded(
      mesh.bounds,
      state.markerInput.unit
    ),
  })),
})

const connector = connect(
  mapStateToProps,
  {}
)

export const MeshDetailsContainer = connector(MeshContainer)

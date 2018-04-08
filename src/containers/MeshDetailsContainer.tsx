import * as React from 'react'
import { connect } from 'react-redux'

import { MeshDetail } from '../components/MeshDetail'
import { Mesh } from '../domain/calculateMesh'
import {
  convertBoundsToMillisecIfNeeded,
  convertBoundsToTokyoIfNeeded,
  convertLatLngToMillisecIfNeeded,
  convertLatLngToTokyoIfNeeded,
} from '../domain/convertLatLng'
import { State as RootState } from '../reducers'

interface MeshDetailsContainerProps {
  meshes: Mesh[]
}

const MeshContainer = ({ meshes }: MeshDetailsContainerProps) => (
  <div>{meshes.map((mesh, index) => <MeshDetail {...mesh} key={index} />)}</div>
)

const mapStateToProps = (state: RootState) => ({
  meshes: state.meshes.map(mesh => ({
    bounds: convertBoundsToMillisecIfNeeded(
      convertBoundsToTokyoIfNeeded(mesh.bounds, state.geodeticInput.datum),
      state.geodeticInput.unit
    ),
    center: convertLatLngToMillisecIfNeeded(
      convertLatLngToTokyoIfNeeded(mesh.center, state.geodeticInput.datum),
      state.geodeticInput.unit
    ),
    code: mesh.code,
  })),
})

const connector = connect(mapStateToProps, {})

export const MeshDetailsContainer = connector(MeshContainer)

// @flow

import React from 'react'
import { connect } from 'react-redux'
import MeshDetail from '../components/MeshDetail'

import type { Connector } from 'react-redux'
import type { Mesh } from '../domain/calculateMesh'
import type { State as RootState } from '../reducers'

type MeshDetailsContainerProps = {
  meshes: Array<Mesh>
}

const MeshContainer = ({ meshes }: MeshDetailsContainerProps) =>
  <div>
    {meshes.map(mesh => <MeshDetail {...mesh} />)}
  </div>

const mapStateToProps = (state: RootState) => ({
  meshes: state.meshes
})

const connector: Connector<{}, MeshDetailsContainerProps> = connect(
  mapStateToProps
)

export default connector(MeshContainer)

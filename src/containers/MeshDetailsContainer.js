// @flow

import React from 'react'
import { connect } from 'react-redux'
import MeshDetail from '../components/MeshDetail'

import type { State as RootState } from '../reducers'

const MeshContainer = ({ meshes }) =>
  <div>
    {meshes.map(mesh =>
      <MeshDetail code={mesh.code} center={mesh.center} bounds={mesh.bounds} />
    )}
  </div>

const mapStateToProps = (state: RootState): RootState => state

const connector = connect(mapStateToProps)

export default connector(MeshContainer)

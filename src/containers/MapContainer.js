// @flow

import React from 'react'
import { connect } from 'react-redux'
import Map from '../components/Map'

import type { State as RootState } from '../reducers'

const MapContainer = ({ meshes }) => {
  return <Map meshes={meshes} />
}

const mapStateToProps = (state: RootState): RootState => state

const connector = connect(mapStateToProps)

export default connector(MapContainer)

// @flow

import React from 'react'
import { connect } from 'react-redux'
import Map from '../components/Map'

import type { State as RootState } from '../reducers'
import type { State as MapState } from '../reducers/map'

const MapContainer = ({ boundsArray }) => <Map boundsArray={boundsArray} />

const mapStateToProps = (state: RootState): MapState => state.map

const connector = connect(mapStateToProps)

export default connector(MapContainer)

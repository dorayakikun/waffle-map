// @flow

import React from 'react'
import { connect } from 'react-redux'
import Map from '../components/Map'

import type { Connector } from 'react-redux'
import type { LatLng } from 'waffle-map-mesh-calculator-basic'
import { updateContextmenuPosition } from '../actions/AppActions'
import type { State as RootState } from '../reducers'
import type { MapProps } from '../components/Map'

const mapStateToProps = (state: RootState) => ({
  ...state.map,
  meshes: state.meshes
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onContextmenu: (event: Event & { latlng: LatLng }) => {
      dispatch(updateContextmenuPosition(event.latlng))
    },
    onClose: () => {
      dispatch(updateContextmenuPosition(null))
    }
  }
}

const connector: Connector<{}, MapProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(Map)

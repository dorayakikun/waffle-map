// @flow

import React from 'react'
import { connect } from 'react-redux'
import { updateContextmenuPosition } from '../actions/AppActions'
import Map from '../components/Map'

import type { Connector } from 'react-redux'
import type { Dispatch } from 'redux'
import type { LatLng } from '../domain/calculateMesh'
import type { Action } from '../actions/AppActions'
import type { State as RootState } from '../reducers'
import type { MapProps } from '../components/Map'

const mapStateToProps = (state: RootState) => ({
  ...state.map,
  ...state.tileToggle,
  meshes: state.meshes
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
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

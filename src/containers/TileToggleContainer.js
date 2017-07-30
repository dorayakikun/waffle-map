// @flow
import React from 'react'
import { connect } from 'react-redux'
import TileToggle from '../components/TileToggle'
import { toggleDebugTiles } from '../actions/AppActions'

import type { Connector } from 'react-redux'
import type { Dispatch } from 'redux'
import type { Action } from '../actions/AppActions'
import type { State as RootState } from '../reducers'
import type { TileToggleProps } from '../components/TileToggle'

const mapStateToProps = (state: RootState) => state.tileToggle

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    onToggleChanged: (_, data: { checked: boolean }) => {
      dispatch(toggleDebugTiles(data.checked))
    }
  }
}

const connector: Connector<{}, TileToggleProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(TileToggle)

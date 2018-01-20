// @flow
import { connect } from 'react-redux'
import TileToggle from '../components/GridToggle'
import { toggleDebugTiles } from '../actions/AppActions'

import type { Connector } from 'react-redux'
import type { Dispatch } from 'redux'
import type { Action } from '../actions/AppActions'
import type { State as RootState } from '../reducers'
import type { Props as TileToggleProps } from '../components/GridToggle'

const mapStateToProps = (state: RootState) => ({
  title: 'Show tiles',
  isShowGrid: state.tileToggle.isShowDebugTiles,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onToggleChanged: (_, data: { checked: boolean }) =>
    dispatch(toggleDebugTiles(data.checked)),
})

const connector: Connector<{}, TileToggleProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(TileToggle)

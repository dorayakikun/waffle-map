import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { CheckboxProps } from 'semantic-ui-react'
import { Action, toggleDebugTiles } from '../actions/AppActions'
import {
  GridToggle as TileToggle,
  Props as TileToggleProps,
} from '../components/GridToggle'
import { State as RootState } from '../reducers'

const mapStateToProps = (state: RootState) => ({
  isShowGrid: state.tileToggle.isShowDebugTiles,
  title: 'Show tiles',
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onToggleChanged: (
    event: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => dispatch(toggleDebugTiles(data.checked as boolean)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export const TileToggleContainer = connector(TileToggle)

import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { Action, putMarker, removeAllMarkers } from '../actions/marker'
import {
  MarkerInput,
  State as MarkerInputState,
} from '../components/MarkerInput'
import { State as RootState } from '../reducers'

const mapStateToProps = (state: RootState) => state.markers

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  putMarker: (
    event: React.SyntheticEvent<HTMLElement>,
    state: MarkerInputState
  ) => {
    dispatch(putMarker(state.latLng))
  },
  removeAllMarkers: () => {
    dispatch(removeAllMarkers())
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export const MarkerInputContainer = connector(MarkerInput)

// @flow

import { connect } from 'react-redux'
import { putMarker, removeAllMarkers, changeUnit } from '../actions/AppActions'
import MarkerInput from '../components/MarkerInput'

import type { Connector } from 'react-redux'
import type { Action } from '../actions/AppActions'
import type {
  Props as MarkerInputProps,
  State as MarkerInputState,
} from '../components/MarkerInput'
import type { State as RootState } from '../reducers'

const mapStateToProps = (state: RootState) => state.markerInput

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  putMarker: (event: Event, state: MarkerInputState) =>
    dispatch(putMarker(state.latLng)),
  removeAllMarkers: () => dispatch(removeAllMarkers()),
  changeUnit: (event: Event, data: { title: string, value: string }) =>
    dispatch(changeUnit(data.value)),
})

const connector: Connector<{}, MarkerInputProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(MarkerInput)

// @flow

import React from 'react';
import { connect } from 'react-redux';
import { putMarker, removeAllMarkers } from '../actions/AppActions';
import MarkerInput from '../components/MarkerInput';

import type { Connector } from 'react-redux';
import type { Action } from '../actions/AppActions';
import type {
  Props as MarkerInputProps,
  State as MarkerInputState,
} from '../components/MarkerInput';
import type { State as RootState } from '../reducers';

const mapStateToProps = (state: RootState) => state.markerInput;

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    putMarker: (event: Event, state: MarkerInputState) => {
      dispatch(putMarker(state.latLng, state.unit));
    },
    removeAllMarkers: () => {
      dispatch(removeAllMarkers());
    },
  };
};

const connector: Connector<{}, MarkerInputProps> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(MarkerInput);

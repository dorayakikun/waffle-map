// @flow
import React from 'react';
import { connect } from 'react-redux';
import MeshToggle from '../components/GridToggle';
import { toggleMeshes } from '../actions/AppActions';

import type { Connector } from 'react-redux';
import type { Dispatch } from 'redux';
import type { Action } from '../actions/AppActions';
import type { State as RootState } from '../reducers';
import type { Props as MeshToggleProps } from '../components/GridToggle';

const mapStateToProps = (state: RootState) => ({
  title: 'Show meshes',
  isShowGrid: state.meshToggle.isShowMeshes,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    onToggleChanged: (_, data: { checked: boolean }) => {
      dispatch(toggleMeshes(data.checked));
    },
  };
};

const connector: Connector<{}, MeshToggleProps> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(MeshToggle);

// @flow

import { connect } from 'react-redux';
import MeshInput from '../components/MeshCodeInput';
import {
  inputMeshes,
  selectDatum,
  selectSeparator,
} from '../actions/AppActions';

import type { Connector } from 'react-redux';
import type { Dispatch } from 'redux';
import type { Action } from '../actions/AppActions';
import type { State as RootState } from '../reducers';
import type {
  OptionItem, Props as MeshCodeInputProps,
} from '../components/MeshCodeInput';

const mapStateToProps = (state: RootState) => state.meshInput;

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onMeshesChanged: (event: Element & { target: HTMLInputElement }) =>
    (dispatch(inputMeshes(event.target.value))),

  onDatumChanged: (event: Event, data: OptionItem) =>
    (dispatch(selectDatum(data.value))),

  onSeparatorChanged: (event: Event, data: OptionItem) =>
    (dispatch(selectSeparator(data.value))),
});

const connector: Connector<{}, MeshCodeInputProps> =
  connect(mapStateToProps, mapDispatchToProps);

export default connector(MeshInput);

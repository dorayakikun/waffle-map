import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Action, changeSeparator, inputMeshCodes } from "../actions/meshCodes";
import { MeshCodeInput } from "../components/MeshCodeInput";
import { State as RootState } from "../reducers";

const mapStateToProps = (state: RootState) => state.meshCodes;

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onMeshesChanged: (e: React.SyntheticEvent<HTMLInputElement>) =>
    dispatch(inputMeshCodes((e.target as any).value)),

  onSeparatorChanged: (e: React.SyntheticEvent<HTMLElement>) =>
    dispatch(changeSeparator((e.target as any).value)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export const MeshCodeInputContainer = connector(MeshCodeInput);

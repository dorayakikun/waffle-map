import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Action, toggleVisible } from "../actions/meshGrid";
import { GridToggle as MeshToggle } from "../components/GridToggle";
import { State as RootState } from "../reducers";

const mapStateToProps = (state: RootState) => ({
  isShowGrid: state.meshGrid.isVisible,
  title: "Show meshes",
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onToggleChanged: (event: React.FormEvent<HTMLInputElement>) =>
    dispatch(toggleVisible((event.target as any).checked)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export const MeshToggleContainer = connector(MeshToggle);

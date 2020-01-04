import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CheckboxProps } from "semantic-ui-react";
import { Action, toggleVisible } from "../actions/meshGrid";
import { GridToggle as MeshToggle } from "../components/GridToggle";
import { State as RootState } from "../reducers";

const mapStateToProps = (state: RootState) => ({
  isShowGrid: state.meshGrid.isVisible,
  title: "Show meshes"
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onToggleChanged: (
    event: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => dispatch(toggleVisible(data.checked as boolean))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export const MeshToggleContainer = connector(MeshToggle);

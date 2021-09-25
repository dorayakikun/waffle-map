import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Action, toggleVisible } from "../actions/tileGrid";
import { GridToggle as TileToggle } from "../components/GridToggle";
import { State as RootState } from "../reducers";

const mapStateToProps = (state: RootState) => ({
  isShowGrid: state.tileGrid.isVisible,
  title: "Show tiles",
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onToggleChanged: (event: React.FormEvent<HTMLInputElement>) =>
    dispatch(toggleVisible((event.target as any).checked)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export const TileToggleContainer = connector(TileToggle);

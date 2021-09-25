import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Action, changeDatum, changeUnit } from "../actions/geodetic";
import { GeodeticInput } from "../components/GeodeticInput";
import { State as RootState } from "../reducers";

const mapStateToProps = (state: RootState) => state.geodetic;

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeUnit: (event: React.SyntheticEvent<HTMLElement>) => {
    dispatch(changeUnit((event.target as any).value));
  },
  onDatumChanged: (event: React.SyntheticEvent<HTMLElement>) => {
    dispatch(changeDatum((event.target as any).value));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export const GeodeticInputContainer = connector(GeodeticInput);

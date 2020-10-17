import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { DropdownProps } from "semantic-ui-react";
import { Action, changeDatum, changeUnit } from "../actions/geodetic";
import { GeodeticInput } from "../components/GeodeticInput";
import { State as RootState } from "../reducers";

const mapStateToProps = (state: RootState) => state.geodetic;

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeUnit: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    dispatch(changeUnit(data.value as string));
  },
  onDatumChanged: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    dispatch(changeDatum(data.value as string));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export const GeodeticInputContainer = connector(GeodeticInput);

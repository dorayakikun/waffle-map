import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Action, putMarker, removeAllMarkers } from "../actions/markers";
import { MarkerInput } from "../components/MarkerInput";
import { State as RootState } from "../reducers";

const mapStateToProps = (state: RootState) => state.markers;

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  putMarker: (latLng: string) => {
    dispatch(putMarker(latLng));
  },
  removeAllMarkers: () => {
    dispatch(removeAllMarkers());
  }
});

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export const MarkerInputContainer = connector(MarkerInput);

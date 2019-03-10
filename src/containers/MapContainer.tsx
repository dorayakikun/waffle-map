import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Action, updateContextmenuPosition } from "../actions/map";
import { Map } from "../components/Map";
import { LatLng } from "../domain/calculateMesh";
import { State as RootState } from "../reducers";

const mapStateToProps = (state: RootState) => ({
  ...state.map,
  datum: state.geodetic.datum,
  isShowDebugTiles: state.tileGrid.isVisible,
  isShowMeshes: state.meshGrid.isVisible,
  meshes: state.meshes,
  unit: state.geodetic.unit
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onClose: () => {
    dispatch(updateContextmenuPosition(undefined));
  },
  onContextmenu: (event: Event & { latlng: LatLng }) => {
    dispatch(updateContextmenuPosition(event.latlng));
  }
});

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export const MapContainer = connector(Map);

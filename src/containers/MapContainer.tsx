import { connect } from "react-redux";
import { Map } from "../components/Map";
import { State as RootState } from "../reducers";

const mapStateToProps = (state: RootState) => ({
  ...state.map,
  datum: state.geodetic.datum,
  isShowDebugTiles: state.tileGrid.isVisible,
  isShowMeshes: state.meshGrid.isVisible,
  meshes: state.meshes,
  unit: state.geodetic.unit,
});

const connector = connect(mapStateToProps, {});

export const MapContainer = connector(Map);

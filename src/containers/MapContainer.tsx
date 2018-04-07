import { Connect, connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Action, updateContextmenuPosition } from '../actions/AppActions'
import { Map, Props as MapProps } from '../components/Map'
import { LatLng } from '../domain/calculateMesh'
import { State as RootState } from '../reducers'

const mapStateToProps = (state: RootState) => ({
  ...state.map,
  ...state.tileToggle,
  ...state.meshToggle,
  datum: state.geodeticInput.datum,
  meshes: state.meshes,
  unit: state.geodeticInput.unit,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onClose: () => {
    dispatch(updateContextmenuPosition(undefined))
  },
  onContextmenu: (event: Event & { latlng: LatLng }) => {
    dispatch(updateContextmenuPosition(event.latlng))
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export const MapContainer = connector(Map)

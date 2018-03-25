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
  meshes: state.meshes,
  datum: state.meshInput.datum,
  unit: state.markerInput.unit,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onContextmenu: (event: Event & { latlng: LatLng }) => {
      dispatch(updateContextmenuPosition(event.latlng))
    },
    onClose: () => {
      dispatch(updateContextmenuPosition(undefined))
    },
  })

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)

export const MapContainer = connector(Map)

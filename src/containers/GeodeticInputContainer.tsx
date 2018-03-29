import { Connect, connect } from 'react-redux'
import { Dispatch } from 'redux'
import { DropdownProps } from 'semantic-ui-react'
import { Action, changeUnit, selectDatum } from '../actions/AppActions'
import {
  GeodeticInput,
  Props as GeodeticInputProps,
} from '../components/GeodeticInput'
import { State as RootState } from '../reducers'

const mapStateToProps = (state: RootState) => state.geodeticInput

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeUnit: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    dispatch(changeUnit(data.value as string))
  },
  onDatumChanged: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    dispatch(selectDatum(data.value as string))
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export const MapContainer = connector(GeodeticInput)

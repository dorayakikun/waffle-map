import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { DropdownProps, InputOnChangeData } from 'semantic-ui-react'
import {
  Action,
  inputMeshes,
  selectDatum,
  selectSeparator,
} from '../actions/AppActions'
import { MeshCodeInput, OptionItem, Props as MeshCodeInputProps } from '../components/MeshCodeInput'
import { State as RootState } from '../reducers'

const mapStateToProps = (state: RootState) => state.meshInput

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onMeshesChanged: (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) =>
    dispatch(inputMeshes(data.value)),

  onDatumChanged: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) =>
    dispatch(selectDatum(data.value as string)),

  onSeparatorChanged: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) =>
    dispatch(selectSeparator(data.value as string)),
})

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)

export const MeshCodeInputContainer = connector(MeshCodeInput)

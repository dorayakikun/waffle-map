import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { DropdownProps, InputOnChangeData } from 'semantic-ui-react'
import { Action, changeSeparator, inputMeshCodes } from '../actions/meshCodes'
import { MeshCodeInput } from '../components/MeshCodeInput'
import { State as RootState } from '../reducers'

const mapStateToProps = (state: RootState) => state.meshCodes

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onMeshesChanged: (
    event: React.SyntheticEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => dispatch(inputMeshCodes(data.value)),

  onSeparatorChanged: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => dispatch(changeSeparator(data.value as string)),
})

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)

export const MeshCodeInputContainer = connector(MeshCodeInput)

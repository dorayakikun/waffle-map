// @flow

import React from 'react'
import { connect } from 'react-redux'
import MeshInput from '../components/MeshCodeInput'
import { inputMeshes, selectSeparator } from '../actions/AppActions'

import type { Connector } from 'react-redux'
import type { Dispatch } from 'redux'
import type { Action } from '../actions/AppActions'
import type { State as RootState } from '../reducers'
import type { MeshCodeInputProps } from '../components/MeshCodeInput'

const mapStateToProps = (state: RootState) => state.meshInput

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    onMeshesChanged: (event: Element & { target: HTMLInputElement }) => {
      dispatch(inputMeshes(event.target.value))
    },
    onSeparatorChanged: (
      event: Event,
      data: any & { text: string, value: string }
    ) => {
      dispatch(selectSeparator(data.value))
    }
  }
}

const connector: Connector<{}, MeshCodeInputProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(MeshInput)

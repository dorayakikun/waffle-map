// @flow

import React from 'react'
import { connect } from 'react-redux'
import MeshInput from '../components/MeshInput'
import { inputMeshes, selectSeparator } from '../actions/AppActions'

import type { Connector } from 'react-redux'
import type { State as RootState } from '../reducers'
import type { MeshInputProps } from '../components/MeshInput'

const mapStateToProps = (state: RootState) => state.meshInput

const mapDispatchToProps = (dispatch: Dispatch) => {
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

const connector: Connector<{}, MeshInputProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(MeshInput)

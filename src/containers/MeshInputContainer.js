// @flow

import React from 'react'
import { connect } from 'react-redux'
import MeshInput from '../components/MeshInput'
import { inputMeshes, selectSeparator } from '../actions/AppActions'

import type { MeshInputState, State as RootState } from '../reducers'
import type { Action } from '../actions/AppActions'

const MeshInputContainer = ({
  meshes,
  separator,
  onMeshesChanged,
  onSeparatorChanged
}) =>
  <MeshInput
    meshes={meshes}
    separator={separator}
    onMeshesChanged={onMeshesChanged}
    onSeparatorChanged={onSeparatorChanged}
  />

const mapStateToProps = (state: RootState): MeshInputState => state.meshInput

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

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(MeshInputContainer)

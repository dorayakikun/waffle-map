// @flow

import { connect } from 'react-redux'

import React, { PropTypes } from 'react'
import { Input, Label } from 'semantic-ui-react'
import { inputMeshes } from '../actions/meshInput'

import type { State, Dispatch } from '../types'

const MeshInput = ({ meshes, onMeshesChanged }) =>
  <div>
    <Input
      label={<Label color="teal">meshes</Label>}
      placeholder="e.g. 5339-35-97"
      onChange={onMeshesChanged}
      value={meshes}
    />
  </div>

MeshInput.propTypes = {
  meshes: PropTypes.string.isRequired,
  centerCoords: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired
    })
  ),
  onMeshesChanged: PropTypes.func.isRequired
}

const mapStateToProps = (state: State) => {
  return {
    meshes: state.meshes
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onMeshesChanged: event => {
      dispatch(inputMeshes(event.target.value))
    }
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(MeshInput)

// @flow

import * as AppActions from '../../src/actions/AppActions'
import reducer from '../../src/reducers'
import * as MeshCalculator from '../../src/MeshCalculator'

test('Should handle INPUT_MESHES', () => {
  const meshesString = '5339'
  const expectedState = {
    meshInput: {
      meshesString,
      separator: '.'
    },
    meshes: [
      {
        code: meshesString,
        center: MeshCalculator.meshToLatLng(meshesString),
        bounds: MeshCalculator.meshToBounds(meshesString)
      }
    ]
  }
  expect(reducer(undefined, AppActions.inputMeshes(meshesString))).toEqual(
    expectedState
  )
})

test('Should handle INPUT_MESHES when setting invalid mesh code', () => {
  const meshesString = '533'
  const expectedState = {
    meshInput: {
      meshesString,
      separator: '.'
    },
    meshes: []
  }
  expect(reducer(undefined, AppActions.inputMeshes(meshesString))).toEqual(
    expectedState
  )
})

test('Should handle SELECT_SEPARATOR', () => {
  const separator = ','
  const expectedState = {
    meshInput: {
      meshesString: '',
      separator
    },
    meshes: []
  }
  expect(reducer(undefined, AppActions.selectSeparator(separator))).toEqual(
    expectedState
  )
})

test('Should return an initial state when setting an invalid action', () => {
  const invalidAction = () => ({ type: 'INVALID_ACTION', payload: {} })
  const expectedState = {
    meshInput: {
      meshesString: '',
      separator: '.'
    },
    meshes: []
  }
  expect(reducer(undefined, (invalidAction(): any))).toEqual(expectedState)
})

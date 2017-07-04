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

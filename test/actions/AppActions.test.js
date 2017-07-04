require('babel-core').buildExternalHelpers()

import * as AppActions from '../../src/actions/AppActions'

test('Should create action to input meshes', () => {
  const meshesString = '5339'
  const expectedAction = {
    type: AppActions.INPUT_MESHES,
    payload: {
      meshesString
    }
  }
  expect(AppActions.inputMeshes(meshesString)).toEqual(expectedAction)
})

test('Should create action to select separator', () => {
  const separator = '.'
  const expectedAction = {
    type: AppActions.SELECT_SEPARATOR,
    payload: {
      separator
    }
  }
  expect(AppActions.selectSeparator(separator)).toEqual(expectedAction)
})
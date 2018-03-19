require('babel-core').buildExternalHelpers()

import * as AppActions from '../../src/actions/AppActions'

test('Should create action to input meshes', () => {
  const meshCodes = '5339'
  const expectedAction = {
    type: AppActions.INPUT_MESHES,
    payload: {
      meshCodes,
    },
  }
  expect(AppActions.inputMeshes(meshCodes)).toEqual(expectedAction)
})

test('Should create action to select separator', () => {
  const separator = '.'
  const expectedAction = {
    type: AppActions.SELECT_SEPARATOR,
    payload: {
      separator,
    },
  }
  expect(AppActions.selectSeparator(separator)).toEqual(expectedAction)
})

test('Should create action to update contextmenu position', () => {
  const latLng = { lat: 35, lng: 139 }
  const expectedAction = {
    type: AppActions.UPDATE_CONTEXTMENU_POSITION,
    payload: {
      latLng,
    },
  }
  expect(AppActions.updateContextmenuPosition(latLng)).toEqual(expectedAction)
})

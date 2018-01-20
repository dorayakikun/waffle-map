require('babel-core').buildExternalHelpers()

import * as AppActions from '../../src/actions/AppActions'
import test from 'ava'

test('Should create action to input meshes', t => {
  const meshCodes = '5339'
  const expectedAction = {
    type: AppActions.INPUT_MESHES,
    payload: {
      meshCodes,
    },
  }
  t.deepEqual(AppActions.inputMeshes(meshCodes), expectedAction)
})

test('Should create action to select separator', t => {
  const separator = '.'
  const expectedAction = {
    type: AppActions.SELECT_SEPARATOR,
    payload: {
      separator,
    },
  }
  t.deepEqual(AppActions.selectSeparator(separator), expectedAction)
})

test('Should create action to update contextmenu position', t => {
  const latLng = { lat: 35, lng: 139 }
  const expectedAction = {
    type: AppActions.UPDATE_CONTEXTMENU_POSITION,
    payload: {
      latLng,
    },
  }
  t.deepEqual(AppActions.updateContextmenuPosition(latLng), expectedAction)
})

import { ActionKeys, inputMeshes, selectSeparator, updateContextmenuPosition } from '../AppActions'

test('Should create action to input meshes', () => {
  const meshCodes = '5339'
  const expectedAction = {
    type: ActionKeys.INPUT_MESHES,
    payload: {
      meshCodes,
    },
  }
  expect(inputMeshes(meshCodes)).toEqual(expectedAction)
})

test('Should create action to select separator', () => {
  const separator = '.'
  const expectedAction = {
    type: ActionKeys.SELECT_SEPARATOR,
    payload: {
      separator,
    },
  }
  expect(selectSeparator(separator)).toEqual(expectedAction)
})

test('Should create action to update contextmenu position', () => {
  const latLng = { lat: 35, lng: 139 }
  const expectedAction = {
    type: ActionKeys.UPDATE_CONTEXTMENU_POSITION,
    payload: {
      latLng,
    },
  }
  expect(updateContextmenuPosition(latLng)).toEqual(expectedAction)
})

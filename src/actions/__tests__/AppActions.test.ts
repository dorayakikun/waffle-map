import {
  ActionKeys,
  inputMeshes,
  selectSeparator,
  updateContextmenuPosition,
} from '../AppActions'

test('Should create action to input meshes', () => {
  const meshCodes = '5339'
  const expectedAction = {
    payload: { meshCodes },
    type: ActionKeys.INPUT_MESHES,
  }
  expect(inputMeshes(meshCodes)).toEqual(expectedAction)
})

test('Should create action to select separator', () => {
  const separator = '.'
  const expectedAction = {
    payload: { separator },
    type: ActionKeys.SELECT_SEPARATOR,
  }
  expect(selectSeparator(separator)).toEqual(expectedAction)
})

test('Should create action to update contextmenu position', () => {
  const latLng = { lat: 35, lng: 139 }
  const expectedAction = {
    payload: { latLng },
    type: ActionKeys.UPDATE_CONTEXTMENU_POSITION,
  }
  expect(updateContextmenuPosition(latLng)).toEqual(expectedAction)
})

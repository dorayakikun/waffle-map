// @flow

import * as AppActions from '../../src/actions/AppActions'
import reducer from '../../src/reducers'
import * as MeshCalculator from 'waffle-map-mesh-calculator-basic'

const defaultState = {
  markerInput: {
    latLng: '',
    unit: 'degree',
    errorMessage: '',
  },
  meshInput: {
    errorMessage: '',
    meshCodes: '',
    datum: 'WGS84',
    separator: '.',
  },
  tileToggle: {
    isShowDebugTiles: false,
  },
  meshToggle: {
    isShowMeshes: false,
  },
  meshes: [],
  map: {
    contextmenuPosition: null,
    markerPositions: [],
  },
}

test('Should handle PUT_MARKER', () => {
  const latLng = '35,139'
  const unit = 'degree'
  expect(reducer(undefined, AppActions.putMarker(latLng))).toEqual({
    ...defaultState,
    markerInput: { latLng, unit, errorMessage: '' },
    map: {
      contextmenuPosition: null,
      markerPositions: [{ lat: 35, lng: 139 }],
    },
  })
})

test('Should handle PUT_MARKER when setting invalid latLng', () => {
  const latLng = 'A,139'
  const unit = 'degree'
  expect(reducer(undefined, AppActions.putMarker(latLng))).toEqual({
    ...defaultState,
    markerInput: {
      latLng,
      unit,
      errorMessage: `Unexpected lat found.
Only numbers are acceptable.
Actual: A,139`,
    },
  })
})

test('Should handle REMOVE_ALL_MARKERS', () => {
  expect(reducer(undefined, AppActions.removeAllMarkers())).toEqual(
    defaultState
  )
})

test('Should handle CHANGE_UNIT', () => {
  const unit = 'millisec'
  expect(reducer(undefined, AppActions.changeUnit(unit))).toEqual({
    ...defaultState,
    markerInput: { ...defaultState.markerInput, unit },
  })
})

test('Should handle INPUT_MESHES', () => {
  const errorMessage = ''
  const meshCodes = '5339'
  expect(reducer(undefined, AppActions.inputMeshes(meshCodes))).toEqual({
    ...defaultState,
    meshInput: {
      errorMessage,
      meshCodes,
      datum: 'WGS84',
      separator: '.',
    },
    meshes: [
      {
        code: meshCodes,
        center: MeshCalculator.toCenterLatLng(meshCodes),
        bounds: MeshCalculator.toBounds(meshCodes),
      },
    ],
  })
})

test('Should handle INPUT_MESHES when setting invalid mesh code', () => {
  const errorMessage = `Invalid mesh code found.
The length of the mesh code is 4, 6, or 8.
The actual length is 3, the mesh code is 533.`
  const meshCodes = '533'
  expect(reducer(undefined, AppActions.inputMeshes(meshCodes))).toEqual({
    ...defaultState,
    meshInput: {
      errorMessage,
      meshCodes,
      datum: 'WGS84',
      separator: '.',
    },
  })
})

test('Should handle SELECT_DATUM', () => {
  const datum = 'Tokyo'
  expect(reducer(undefined, AppActions.selectDatum(datum))).toEqual({
    ...defaultState,
    meshInput: {
      errorMessage: '',
      meshCodes: '',
      datum,
      separator: '.',
    },
  })
})

test('Should handle SELECT_SEPARATOR', () => {
  const errorMessage = ''
  const separator = ','
  expect(reducer(undefined, AppActions.selectSeparator(separator))).toEqual({
    ...defaultState,
    meshInput: {
      errorMessage,
      meshCodes: '',
      datum: 'WGS84',
      separator,
    },
  })
})

test('Should handle TOGGLE_DEBUG_TILES', () => {
  const isShowDebugTiles = true
  expect(
    reducer(undefined, AppActions.toggleDebugTiles(isShowDebugTiles))
  ).toEqual({
    ...defaultState,
    tileToggle: {
      isShowDebugTiles,
    },
  })
})

test('Should handle TOGGLE_MESHES', () => {
  const isShowMeshes = true
  expect(reducer(undefined, AppActions.toggleMeshes(isShowMeshes))).toEqual({
    ...defaultState,
    meshToggle: {
      isShowMeshes,
    },
  })
})

test('Should handle UPDATE_CONTEXTMENU_POSITION', () => {
  const latLng = { lat: 35, lng: 139 }
  expect(
    reducer(undefined, AppActions.updateContextmenuPosition(latLng))
  ).toEqual({
    ...defaultState,
    map: {
      contextmenuPosition: latLng,
      markerPositions: [],
    },
  })
})

test('Should return an initial state when setting an invalid action', () => {
  const invalidAction = () => ({ type: 'INVALID_ACTION', payload: {} })
  expect(reducer(undefined, (invalidAction(): any))).toEqual(defaultState)
})

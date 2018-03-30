import * as MeshCalculator from 'waffle-map-mesh-calculator-basic'
import * as AppActions from '../../actions/AppActions'
import { initialState, reducers } from '../index'

test('Should handle PUT_MARKER', () => {
  const latLng = '35,139'
  expect(reducers(undefined, AppActions.putMarker(latLng))).toEqual({
    ...initialState,
    markerInput: { latLng, errorMessage: '' },
    map: {
      contextmenuPosition: undefined,
      markerPositions: [{ lat: 35, lng: 139 }],
    },
  })
})

test('Should handle PUT_MARKER when setting invalid latLng', () => {
  const latLng = 'A,139'
  expect(reducers(undefined, AppActions.putMarker(latLng))).toEqual({
    ...initialState,
    markerInput: {
      latLng,
      errorMessage: `Unexpected lat found.
Only numbers are acceptable.
Actual: A,139`,
    },
  })
})

test('Should handle REMOVE_ALL_MARKERS', () => {
  expect(reducers(undefined, AppActions.removeAllMarkers())).toEqual(
    initialState
  )
})

test('Should handle CHANGE_UNIT', () => {
  const unit = 'millisec'
  expect(reducers(undefined, AppActions.changeUnit(unit))).toEqual({
    ...initialState,
    geodeticInput: { ...initialState.geodeticInput, unit },
  })
})

test('Should handle INPUT_MESHES', () => {
  const errorMessage = ''
  const meshCodes = '5339'
  expect(reducers(undefined, AppActions.inputMeshes(meshCodes))).toEqual({
    ...initialState,
    meshInput: {
      errorMessage,
      meshCodes,
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
  expect(reducers(undefined, AppActions.inputMeshes(meshCodes))).toEqual({
    ...initialState,
    meshInput: {
      errorMessage,
      meshCodes,
      separator: '.',
    },
  })
})

test('Should handle SELECT_DATUM', () => {
  const datum = 'Tokyo'
  expect(reducers(undefined, AppActions.selectDatum(datum))).toEqual({
    ...initialState,
    geodeticInput: { ...initialState.geodeticInput, datum },
  })
})

test('Should handle SELECT_SEPARATOR', () => {
  const errorMessage = ''
  const separator = ','
  expect(reducers(undefined, AppActions.selectSeparator(separator))).toEqual({
    ...initialState,
    meshInput: {
      errorMessage,
      meshCodes: '',
      separator,
    },
  })
})

test('Should handle TOGGLE_DEBUG_TILES', () => {
  const isShowDebugTiles = true
  expect(
    reducers(undefined, AppActions.toggleDebugTiles(isShowDebugTiles))
  ).toEqual({
    ...initialState,
    tileToggle: {
      isShowDebugTiles,
    },
  })
})

test('Should handle TOGGLE_MESHES', () => {
  const isShowMeshes = true
  expect(reducers(undefined, AppActions.toggleMeshes(isShowMeshes))).toEqual({
    ...initialState,
    meshToggle: {
      isShowMeshes,
    },
  })
})

test('Should handle UPDATE_CONTEXTMENU_POSITION', () => {
  const latLng = { lat: 35, lng: 139 }
  expect(
    reducers(undefined, AppActions.updateContextmenuPosition(latLng))
  ).toEqual({
    ...initialState,
    map: {
      contextmenuPosition: latLng,
      markerPositions: [],
    },
  })
})

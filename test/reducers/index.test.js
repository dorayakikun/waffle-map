// @flow

import test from 'ava';
import * as AppActions from '../../src/actions/AppActions';
import reducer from '../../src/reducers';
import * as MeshCalculator from 'waffle-map-mesh-calculator-basic';

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
};

test('Should handle PUT_MARKER', t => {
  const latLng = '35,139';
  const unit = 'degree';
  t.deepEqual(
    reducer(undefined, AppActions.putMarker(latLng, unit)),
    {
      ...defaultState,
      markerInput: {
        latLng: latLng, unit: unit, errorMessage: '',
      },
      map: {
        contextmenuPosition: null,
        markerPositions: [{ lat: 35, lng: 139 }],
      },
    });
});

test('Should handle PUT_MARKER when setting invalid latLng', t => {
  const latLng = 'A,139';
  const unit = 'degree';
  t.deepEqual(
    reducer(undefined, AppActions.putMarker(latLng, unit)),
    {
      ...defaultState,
      markerInput: {
        latLng: latLng, unit: unit, errorMessage: `Unexpected lat found.
Only numbers are acceptable.
Actual: A,139`},
    });
});

test('Should handle REMOVE_ALL_MARKERS', t => {
  t.deepEqual(reducer(undefined, AppActions.removeAllMarkers()), defaultState);
});

test('Should handle INPUT_MESHES', t => {
  const errorMessage = '';
  const meshCodes = '5339';
  t.deepEqual(
    reducer(undefined, AppActions.inputMeshes(meshCodes)),
    {
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
          center: MeshCalculator.meshToLatLng(meshCodes),
          bounds: MeshCalculator.meshToBounds(meshCodes),
        },
      ],
    });
});

test('Should handle INPUT_MESHES when setting invalid mesh code', t => {
  const errorMessage = `Invalid mesh code found.
The length of the mesh code is 4, 6, or 8.
The actual length is 3, the mesh code is 533.`;
  const meshCodes = '533';
  t.deepEqual(
    reducer(undefined, AppActions.inputMeshes(meshCodes)),
    {
      ...defaultState,
      meshInput: {
        errorMessage,
        meshCodes,
        datum: 'WGS84',
        separator: '.',
      },
    });
});

test('Should handle SELECT_DATUM', t => {
  const datum = 'Tokyo';
  t.deepEqual(reducer(undefined, AppActions.selectDatum(datum)), {
    ...defaultState, meshInput: {
      errorMessage: '',
      meshCodes: '',
      datum,
      separator: '.',
    },
  });
});

test('Should handle SELECT_SEPARATOR', t => {
  const errorMessage = '';
  const separator = ',';
  t.deepEqual(
    reducer(undefined, AppActions.selectSeparator(separator)),
    {
      ...defaultState,
      meshInput: {
        errorMessage,
        meshCodes: '',
        datum: 'WGS84',
        separator,
      },
    });
});

test('Should handle TOGGLE_DEBUG_TILES', t => {
  const isShowDebugTiles = true;
  t.deepEqual(
    reducer(undefined, AppActions.toggleDebugTiles(isShowDebugTiles)),
    {
      ...defaultState,
      tileToggle: {
        isShowDebugTiles,
      },
    });
});

test('Should handle TOGGLE_MESHES', t => {
  const isShowMeshes = true;
  t.deepEqual(
    reducer(undefined, AppActions.toggleMeshes(isShowMeshes)),
    {
      ...defaultState,
      meshToggle: {
        isShowMeshes,
      },
    });
});

test('Should handle UPDATE_CONTEXTMENU_POSITION', t => {
  const latLng = { lat: 35, lng: 139 };
  t.deepEqual(
    reducer(undefined, AppActions.updateContextmenuPosition(latLng)),
    {
      ...defaultState,
      map: {
        contextmenuPosition: latLng,
        markerPositions: [],
      },
    });
});

test('Should return an initial state when setting an invalid action', t => {
  const invalidAction = () => ({ type: 'INVALID_ACTION', payload: {} });
  t.deepEqual(reducer(undefined, (invalidAction(): any)), defaultState);
});

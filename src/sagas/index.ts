import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects'
import { removeAllMarkers as _removeAllMarkers } from '../actions/map'
import {
  ActionKeys as MarkerActionKeys,
  changeErrorMessage as changeMarkersErrorMessage,
  inputLatLng,
  PutMarkerAction,
} from '../actions/marker'
import {
  ActionKeys as MeshCodesActionKeys,
  changeErrorMessage as changeMeshCodesErrorMessage,
} from '../actions/meshCodes'
import {
  ActionKeys as MeshesActionKeys,
  changeMeshes
} from '../actions/meshes'
import { getMeshCodesInput } from '../reducers'
import { mapToMeshes } from '../reducers/meshes'


function* createMeshes() {
  const { meshCodes, separator } = yield select(getMeshCodesInput) // TODO fix to getMeshCodes
  let errorMessage = ''
  try {
    const meshes = mapToMeshes(meshCodes, separator)
    console.log('meshes: %o', meshes)
    yield put(changeMeshes(meshes))
    // TODO 基本的にErrorを含む処理はreducerに含めないほうが良さそう
  } catch (e) {
    errorMessage = e.message
  }
  yield put(changeMeshCodesErrorMessage(errorMessage))
}

function* inputMeshCodes() {
  while (true) {
    yield take(MeshCodesActionKeys.INPUT_MESH_CODES)
    yield call(createMeshes)
  }
}

function* putMarker(action: PutMarkerAction) {
  yield put(inputLatLng(action.payload.latLng))
  // TODO 関連ファイルをmarkersにリネーム あと meshCodesも
  let errorMessage = ''
  try {
    // yield put(concatMarkerPositions)
  } catch (e) {
    errorMessage = e.message
  }
  yield put(changeMarkersErrorMessage(errorMessage))
}

function* removeAllMarkers() {
  yield put(_removeAllMarkers())
}

export function* rootSaga() {
  yield all([
    fork(inputMeshCodes),
    takeEvery(MarkerActionKeys.PUT_MARKER, putMarker),
    takeEvery(MarkerActionKeys.REMOVE_ALL_MARKERS, removeAllMarkers),
  ])
}

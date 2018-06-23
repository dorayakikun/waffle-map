import { all, call, fork, put, select, take, takeEvery } from 'redux-saga/effects'
import { ActionKeys } from '../actions/AppActions'

function* createMeshes() {
  yield select()// select meshInput state
  // select geodeticInput state
  // yield put(ActionKeys.CREATE_MESHES)
}

function* inputMeshCode() {
  yield take(ActionKeys.INPUT_MESHES)// ActionKeys.INPUT_MESH_CODES
  yield call(createMeshes)
}

export function* rootSaga() {
  yield all([
    fork(inputMeshCode),
  ])
} 
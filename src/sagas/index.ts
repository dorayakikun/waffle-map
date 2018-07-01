import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects'
import * as Actions from '../actions/AppActions'
import { getMeshCodesInput } from '../reducers'

function* createMeshes() {
  const { meshCodes, separator } = yield select(getMeshCodesInput)
  yield put(Actions.createMeshes(meshCodes, separator))
}

function* inputMeshCodes() {
  while (true) {
    yield take(Actions.ActionKeys.INPUT_MESH_CODES)
    yield call(createMeshes)
  }
}

export function* rootSaga() {
  yield all([fork(inputMeshCodes)])
}

import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
} from "redux-saga/effects";
import {
  concatMarkerPositions,
  removeAllMarkers as _removeAllMarkers,
} from "../actions/map";
import {
  ActionKeys as MarkerActionKeys,
  changeErrorMessage as changeMarkersErrorMessage,
  inputLatLng,
  PutMarkerAction,
} from "../actions/markers";
import {
  ActionKeys as MeshCodesActionKeys,
  changeErrorMessage as changeMeshCodesErrorMessage,
} from "../actions/meshCodes";
import { changeMeshes } from "../actions/meshes";
import { createLatLng } from "../domain/convertLatLng";
import { getGeodetic, getMeshCodes } from "../reducers";
import { mapToMeshes } from "../reducers/meshes";

function* createMeshes() {
  const { meshCodes, separator } = yield select(getMeshCodes);
  let errorMessage = "";
  try {
    yield put(changeMeshes(mapToMeshes(meshCodes, separator)));
  } catch (e) {
    errorMessage = e.message;
  }
  yield put(changeMeshCodesErrorMessage(errorMessage));
}

function* inputMeshCodes() {
  while (true) {
    yield take(MeshCodesActionKeys.INPUT_MESH_CODES);
    yield call(createMeshes);
  }
}

function* putMarker(action: PutMarkerAction) {
  const { latLng } = action.payload;
  yield put(inputLatLng(latLng));
  const { unit } = yield select(getGeodetic);
  let errorMessage = "";
  try {
    yield put(concatMarkerPositions(createLatLng(latLng, unit)));
  } catch (e) {
    errorMessage = e.message;
  }
  yield put(changeMarkersErrorMessage(errorMessage));
}

function* removeAllMarkers() {
  yield put(_removeAllMarkers());
}

export function* rootSaga() {
  yield all([
    fork(inputMeshCodes),
    takeEvery(MarkerActionKeys.PUT_MARKER, putMarker),
    takeEvery(MarkerActionKeys.REMOVE_ALL_MARKERS, removeAllMarkers),
  ]);
}

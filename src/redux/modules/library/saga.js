import { all, call, put, takeEvery } from 'redux-saga/effects';
import { API_HTTP, API_VERSION } from '../../../configs/environment';
import {ActionTypesLibrary, fetchLibraryFailure, fetchLibrarySuccess} from './index';
import {createRequest} from '../../rootSagas';

export function* fetchLibraryWorker() {
  const request = {
    method: 'get',
    url: `${API_HTTP}/${API_VERSION}/info`
  };

  try {
    const response = yield call(createRequest, request);
    yield put(fetchLibrarySuccess(response));
  } catch (e) {
    yield put(fetchLibraryFailure(e));
  }
}

export function* watchLibraryActionsSaga() {
  yield all([
    takeEvery(ActionTypesLibrary.FETCH_LIBRARY_REQUEST, fetchLibraryWorker)
  ]);
}
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { API_HTTP } from '../../../configs/environment';

import {
  ActionTypesLibrary,
  fetchLibraryFailure,
  fetchLibrarySuccess, 
  fetchInfoFailure, 
  fetchInfoSuccess
} from './index';
import {createRequest} from '../../rootSagas';

export function* fetchLibraryWorker({type, params = {}}) { //first arg = action
  const { _id } = params 
  let url = _id ? `${API_HTTP}/library/${_id}` : `${API_HTTP}/library`
  if (params.type) {
    url = url.concat(`?type=${params.type}`)
  }
  const request = {
    method: 'get',
    url
  };

  try {
    const response = yield call(createRequest, request);
    console.log('response :', response);
    if (type === ActionTypesLibrary.FETCH_LIBRARY_REQUEST) {
      yield put(fetchLibrarySuccess(response.map(info => ({...info, attachmentUrls: info.attachments && info.attachments.map( attach => `${API_HTTP}/${attach}`)}))));
    } else {
      yield put(fetchInfoSuccess({...response, attachmentUrls: response.attachments && response.attachments.map( attach => `${API_HTTP}/${attach}`)}));
    }
  } catch (e) {
    if (type === ActionTypesLibrary.FETCH_LIBRARY_REQUEST) {
      yield put(fetchLibraryFailure((e.response && e.response.data) || e));
    } else {
      yield put(fetchInfoFailure((e.response && e.response.data) || e));
    }
  }
}

export function* watchLibraryActionsSaga() {
  yield all([
    takeEvery(ActionTypesLibrary.FETCH_LIBRARY_REQUEST, fetchLibraryWorker),
    takeEvery(ActionTypesLibrary.FETCH_INFO_REQUEST, fetchLibraryWorker)
  ]);
}
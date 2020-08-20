import { all, call, put, takeEvery } from 'redux-saga/effects';
import { API_HTTP } from '../../../configs/environment';
import {
  ActionTypesMasterclass,
  fetchMasterclassFailure,
  fetchMasterclassSuccess, 
  fetchInfoFailure, 
  fetchInfoSuccess,
  registerMasterclassSuccess,
  registerMasterclassFailure
} from './index';
import {createRequest} from '../../rootSagas';

export function* fetchMasterclassWorker({type, params = {}}) { //first arg = action
  const { _id } = params 
  let url = _id ? `${API_HTTP}/masterclass/${_id}` : `${API_HTTP}/masterclass/mapped`
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
    if (type === ActionTypesMasterclass.FETCH_MASTERCLASS_REQUEST) {
      yield put(fetchMasterclassSuccess(response));
    } else {
      yield put(fetchInfoSuccess(response));
    }
  } catch (e) {
    if (type === ActionTypesMasterclass.FETCH_MASTERCLASS_REQUEST) {
      yield put(fetchMasterclassFailure((e.response && e.response.data) || e));
    } else {
      yield put(fetchInfoFailure((e.response && e.response.data) || e));
    }
  }
}

export function* registerMasterclassWorker({type, params = {}}) {
  const { _id } = params 
  const url = `${API_HTTP}/masterclass/${_id}/register`;
  const request = {
      method: 'post',
      url
  };
  try {
      const response = yield call(createRequest, request);
      console.log('response :>> ', response);
      yield put(registerMasterclassSuccess(response))
  } catch (e) {
    yield put(registerMasterclassFailure((e.response && e.response.data) || e));
  }
}

export function* watchMasterclassActionsSaga() {
  yield all([
    takeEvery(ActionTypesMasterclass.FETCH_MASTERCLASS_REQUEST, fetchMasterclassWorker),
    takeEvery(ActionTypesMasterclass.FETCH_INFO_REQUEST, fetchMasterclassWorker),
    takeEvery(ActionTypesMasterclass.REGISTER_MASTERCLASS_REQUEST, registerMasterclassWorker)
  ]);
}
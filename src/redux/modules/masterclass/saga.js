import { all, call, put, takeEvery } from 'redux-saga/effects';
import { API_HTTP } from '../../../configs/environment';
import {
  ActionTypesMasterclass,
  fetchMasterclassFailure,
  fetchMasterclassSuccess, 
  fetchInfoFailure, 
  fetchInfoSuccess
} from './index';
import {createRequest} from '../../rootSagas';

export function* fetchMasterclassWorker({type, params = {}}) { //first arg = action
  const { _id } = params 
  let url = _id ? `${API_HTTP}/masterclass/${_id}` : `${API_HTTP}/masterclass`
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
      yield put(fetchMasterclassSuccess(response.map(info => ({...info, photoUrl: `${API_HTTP}/images/${info.photo}`}))));
    } else {
      yield put(fetchInfoSuccess(
        {
          ...response,
          photoUrl: `${API_HTTP}/images/${response.photo}`,
          students: response.students.map( student => ({...student, photoUrl: `${API_HTTP}/images/${student.photo}`}))
        }
      ));
    }
  } catch (e) {
    if (type === ActionTypesMasterclass.FETCH_MASTERCLASS_REQUEST) {
      yield put(fetchMasterclassFailure(e));
    } else {
      yield put(fetchInfoFailure(e));
    }
  }
}

export function* watchMasterclassActionsSaga() {
  yield all([
    takeEvery(ActionTypesMasterclass.FETCH_MASTERCLASS_REQUEST, fetchMasterclassWorker),
    takeEvery(ActionTypesMasterclass.FETCH_INFO_REQUEST, fetchMasterclassWorker)
  ]);
}
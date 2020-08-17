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
      yield put(fetchMasterclassSuccess(
        Object.fromEntries(Object.entries(response).map(([key, infos]) => {
          return [key, infos.map(info => (
            {
              ...info,
              photoUrl: `${API_HTTP}/images/${info.photo}`,
              students: info.students.map( student => ({...student, photoUrl: `${API_HTTP}/images/${student.photo}`}))
            }
            )
          )]
        })
      )));
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
      yield put(registerMasterclassSuccess(
        {
          ...response,
          photoUrl: `${API_HTTP}/images/${response.photo}`,
          students: response.students.map( student => ({...student, photoUrl: `${API_HTTP}/images/${student.photo}`}))
        }
      ))
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
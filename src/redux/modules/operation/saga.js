import { all, call, put, takeEvery } from 'redux-saga/effects';
import { API_HTTP } from '../../../configs/environment';
import {
  ActionTypesOperation,
  fetchOperationFailure,
  fetchOperationSuccess, 
  fetchInfoFailure, 
  fetchInfoSuccess,
  registerOperationSuccess,
  registerOperationFailure,
  fetchOperationViewFailure,
  fetchOperationViewSuccess, 
  activateUserSuccess,
  activateUserFailure,
  killUserSuccess,
  killUserFailure
} from './index';
import {createRequest} from '../../rootSagas';

export function* fetchOperationWorker({type, params = {}}) { //first arg = action
  const { _id } = params 
  let url = _id ? `${API_HTTP}/operation/${_id}` : `${API_HTTP}/operation`
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
    if (type === ActionTypesOperation.FETCH_OPERATION_REQUEST) {
      yield put(fetchOperationSuccess(response));
    } else {
      yield put(fetchInfoSuccess(
        {
          ...response,
          photo: `${API_HTTP}/images/${response.photo}`,
          users: response.users
        }
      ));
    }
  } catch (e) {
    if (type === ActionTypesOperation.FETCH_OPERATION_REQUEST) {
      yield put(fetchOperationFailure((e.response && e.response.data) || e));
    } else {
      yield put(fetchInfoFailure((e.response && e.response.data) || e));
    }
  }
}

export function* registerOperationWorker({type, params = {}}) {
  const { _id } = params 
  const url = `${API_HTTP}/operation/${_id}/register`;
  const request = {
      method: 'post',
      url
  };
  try {
      const response = yield call(createRequest, request);
      console.log('response :>> ', response);
      yield put(registerOperationSuccess(
        {
          ...response,
          photo: `${API_HTTP}/images/${response.photo}`,
          users: response.users
        }
      ))
  } catch (e) {
    yield put(registerOperationFailure((e.response && e.response.data) || e));
  }
}

export function* fetchOperationViewWorker({type, params = {}}) {
  const url = `${API_HTTP}/operation/view`;
  const request = {
      method: 'get',
      url
  };
  try {
      const response = yield call(createRequest, request);
      console.log('response :>> ', response);
      yield put(fetchOperationViewSuccess(
        response.map(
          operation => ({
            ...operation,
            users: operation.users.map( user => ({...user, gifUrl: `${API_HTTP}/gifs/${user.gif}`}))
          })
        )
      ))
  } catch (e) {
    yield put(fetchOperationViewFailure((e.response && e.response.data) || e));
  }
}

export function* activateUserWorker({type, params = {}}) {
  const { _id, opId } = params 
  if ( _id) {
    yield put(activateUserSuccess())
  } else {
    const url = `${API_HTTP}/user/activateOperation/${opId}`
    const request = {
      method: 'get',
      url
    };
    try {
        const response = yield call(createRequest, request);
        console.log('response :>> ', response);
        yield put(activateUserSuccess())
    } catch (e) {
      yield put(activateUserFailure((e.response && e.response.data) || e));
    }
  }
}

export function* killUserWorker({type, params = {}}) {
  const { _id } = params 
  if ( _id) {
    const url = `${API_HTTP}/user/${_id}/kill`
    const request = {
      method: 'get',
      url
    };
    try {
        const response = yield call(createRequest, request);
        console.log('response :>> ', response);
        yield put(killUserSuccess())
    } catch (e) {
      yield put(killUserFailure((e.response && e.response.data) || e));
    }
  }
}

export function* watchOperationActionsSaga() {
  yield all([
    takeEvery(ActionTypesOperation.FETCH_OPERATION_REQUEST, fetchOperationWorker),
    takeEvery(ActionTypesOperation.FETCH_INFO_REQUEST, fetchOperationWorker),
    takeEvery(ActionTypesOperation.REGISTER_OPERATION_REQUEST, registerOperationWorker),
    takeEvery(ActionTypesOperation.FETCH_OPERATION_VIEW_REQUEST, fetchOperationViewWorker),
    takeEvery(ActionTypesOperation.ACTIVATE_USER_REQUEST, activateUserWorker),
    takeEvery(ActionTypesOperation.KILL_USER_REQUEST, killUserWorker)
  ]);
}
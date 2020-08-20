import { all, call, put, takeEvery } from 'redux-saga/effects';
import { API_HTTP } from '../../../configs/environment';
import {
  ActionTypesUsers,
  signUpUserSuccess,
  signUpUserFailure, 
  signInUserSuccess, 
  signInUserFailure,
  autoupdateUserSuccess,
  autoupdateUserFailure,
  fetchUserPageSuccess,
  fetchUserPageFailure
} from './index';
import {createRequest} from '../../rootSagas';

export function* singUpUserWorker({type, userInfo = {}}) {
    const url = `${API_HTTP}/auth/signup`;
    const request = {
        method: 'post',
        url,
        data: {...userInfo}
    };
    try {
        const response = yield call(createRequest, request);
        console.log('response :>> ', response);
        yield put(signUpUserSuccess(response))
    } catch (e) {;
        yield put(signUpUserFailure((e.response && e.response.data) || e));
    }
}

export function* singInUserWorker({type, userInfo = {}}) {
  const url = `${API_HTTP}/auth/signin`;
  const request = {
      method: 'post',
      url,
      data: {...userInfo}
  };
  try {
      const response = yield call(createRequest, request);
      console.log('response :>> ', response);
      yield put(signInUserSuccess(response))
  } catch (e) {;
      yield put(signInUserFailure((e.response && e.response.data) || e));
  }
}

export function* autoupdateUserWorker({type}) {
  const url = `${API_HTTP}/auth/autoupdate`;
  const request = {
      method: 'post',
      url
  };
  try {
      const response = yield call(createRequest, request);
      console.log('response :>> ', response);
      yield put(autoupdateUserSuccess(response))
  } catch (e) {;
      yield put(autoupdateUserFailure((e.response && e.response.data) || e));
  }
}

export function* fetchUserPageWorker({type, userId}) {
  try {
    const examRequest = {
        method: 'get',
        url: `${API_HTTP}/exam/user/${userId}`
    };
    const exams = yield call(createRequest, examRequest);
    console.log('exams :>> ', exams);
    const operationsRequest = {
        method: 'get',
        url: `${API_HTTP}/operation/user/${userId}`
    };
    const operations = yield call(createRequest, operationsRequest);
    console.log('operations :>> ', operations);
    yield put(fetchUserPageSuccess({exams, operations}))
  } catch (e) {
    yield put(fetchUserPageFailure((e.response && e.response.data) || e));
  }
}

export function* watchUsersActionsSaga() {
  yield all([
    takeEvery(ActionTypesUsers.SIGN_UP_USER_REQUEST, singUpUserWorker),
    takeEvery(ActionTypesUsers.SIGN_IN_USER_REQUEST, singInUserWorker),
    takeEvery(ActionTypesUsers.AUTOUPDATE_USER_REQUEST, autoupdateUserWorker),
    takeEvery(ActionTypesUsers.FETCH_USER_PAGE_REQUEST, fetchUserPageWorker)
  ]);
}
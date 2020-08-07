import { all, call, put, takeEvery } from 'redux-saga/effects';
import { API_HTTP } from '../../../configs/environment';
import {
  ActionTypesUsers,
  signUpUserSuccess,
  signUpUserFailure, 
  signInUserSuccess, 
  signInUserFailure,
  autoupdateUserSuccess,
  autoupdateUserFailure
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
        yield put(signUpUserFailure(e));
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
      yield put(signInUserSuccess({...response, photoUrl: `${API_HTTP}/images/${response.photo}`}))
  } catch (e) {;
      yield put(signInUserFailure(e));
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
      yield put(autoupdateUserSuccess({...response, photoUrl: `${API_HTTP}/images/${response.photo}`}))
  } catch (e) {;
      yield put(autoupdateUserFailure(e));
  }
}

export function* watchUsersActionsSaga() {
  yield all([
    takeEvery(ActionTypesUsers.SIGN_UP_USER_REQUEST, singUpUserWorker),
    takeEvery(ActionTypesUsers.SIGN_IN_USER_REQUEST, singInUserWorker),
    takeEvery(ActionTypesUsers.AUTOUPDATE_USER_REQUEST, autoupdateUserWorker)
  ]);
}
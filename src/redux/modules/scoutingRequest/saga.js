import { all, call, put, takeEvery } from 'redux-saga/effects';
import { API_HTTP } from '../../../configs/environment';
import {
    ActionTypesScoutingRequest,
    fetchScoutingRequestFailure,
    fetchScoutingRequestSuccess,
    fetchInfoFailure,
    fetchInfoSuccess,
    registerScoutingRequestSuccess,
    registerScoutingRequestFailure
} from './index';
import {createRequest} from '../../rootSagas';
import {ActionTypesMasterclass, registerMasterclassFailure, registerMasterclassSuccess} from "../masterclass";
import {registerMasterclassWorker} from "../masterclass/saga";


export function* fetchScoutingRequestWorker({type, params = {}}) { //first arg = action
    const { _id } = params
    let url = _id ? `${API_HTTP}/scoutingRequest/${_id}` : `${API_HTTP}/scoutingRequest`
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
        if (type === ActionTypesScoutingRequest.FETCH_SCOUTINGREQUEST_REQUEST) {
            yield put(fetchScoutingRequestSuccess(response.map(info => ({...info, photoUrl: `${API_HTTP}/images/${info.photo}`}))));
        } else {
            yield put(fetchInfoSuccess({...response, photoUrl: `${API_HTTP}/images/${response.photo}`}));
        }
    } catch (e) {
        if (type === ActionTypesScoutingRequest.FETCH_SCOUTINGREQUEST_REQUEST) {
            yield put(fetchScoutingRequestFailure((e.response && e.response.data) || e));
        } else {
            yield put(fetchInfoFailure((e.response && e.response.data) || e));
        }
    }
}

export function* registerScoutingRequestWorker({type, params = {}}) {
    const { requestObject, place, task } = params
    const url = `${API_HTTP}/scoutingRequest`;
    const data = {requestObject, place, task}
    const request = {
        method: 'post',
        url,
        data
    };
    try {
        const response = yield call(createRequest, request);
        console.log('response :>> ', response);
        yield put(registerScoutingRequestSuccess(response))
    } catch (e) {
        yield put(registerScoutingRequestFailure((e.response && e.response.data) || e));
    }
}

export function* watchScoutingRequestActionsSaga() {
    yield all([
        takeEvery(ActionTypesScoutingRequest.FETCH_SCOUTINGREQUEST_REQUEST, fetchScoutingRequestWorker),
        takeEvery(ActionTypesScoutingRequest.FETCH_INFO_REQUEST, fetchScoutingRequestWorker),
        takeEvery(ActionTypesScoutingRequest.REGISTER_SCOUTINGREQUEST_REQUEST, registerScoutingRequestWorker)
    ]);
}
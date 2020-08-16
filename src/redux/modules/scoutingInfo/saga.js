import { all, call, put, takeEvery } from 'redux-saga/effects';
import { API_HTTP } from '../../../configs/environment';
import {
    ActionTypesScoutingInfo,
    fetchScoutingInfoFailure,
    fetchScoutingInfoSuccess,
    fetchInfoFailure,
    fetchInfoSuccess
} from './index';
import {createRequest} from '../../rootSagas';


export function* fetchScoutingInfoWorker({type, params = {}}) { //first arg = action
    const { _id } = params
    let url = _id ? `${API_HTTP}/scoutingInfo/${_id}` : `${API_HTTP}/scoutingInfo`
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
        if (type === ActionTypesScoutingInfo.FETCH_SCOUTINGINFO_REQUEST) {
            yield put(fetchScoutingInfoSuccess(response.map(info => ({...info, photoUrl: `${API_HTTP}/images/${info.photo}`}))));
        } else {
            yield put(fetchInfoSuccess({...response, photoUrl: `${API_HTTP}/images/${response.photo}`}));
        }
    } catch (e) {
        if (type === ActionTypesScoutingInfo.FETCH_SCOUTINGINFO_REQUEST) {
            yield put(fetchScoutingInfoFailure((e.response && e.response.data) || e));
        } else {
            yield put(fetchInfoFailure((e.response && e.response.data) || e));
        }
    }
}

export function* watchScoutingInfoActionsSaga() {
    yield all([
        takeEvery(ActionTypesScoutingInfo.FETCH_SCOUTINGINFO_REQUEST, fetchScoutingInfoWorker),
        takeEvery(ActionTypesScoutingInfo.FETCH_INFO_REQUEST, fetchScoutingInfoWorker)
    ]);
}
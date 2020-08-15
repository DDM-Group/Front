import { all, call, put, takeEvery } from 'redux-saga/effects';
import { API_HTTP } from '../../../configs/environment';
import {
    ActionTypesScouting,
    fetchScoutingFailure,
    fetchScoutingSuccess,
    fetchInfoFailure,
    fetchInfoSuccess
} from './index';
import {createRequest} from '../../rootSagas';


export function* fetchScoutingWorker({type, params = {}}) { //first arg = action
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
        if (type === ActionTypesScouting.FETCH_SCOUTING_REQUEST) {
            yield put(fetchScoutingSuccess(response.map(info => ({...info, photoUrl: `${API_HTTP}/images/${info.photo}`}))));
        } else {
            yield put(fetchInfoSuccess({...response, photoUrl: `${API_HTTP}/images/${response.photo}`}));
        }
    } catch (e) {
        if (type === ActionTypesScouting.FETCH_SCOUTING_REQUEST) {
            yield put(fetchScoutingFailure((e.response && e.response.data) || e));
        } else {
            yield put(fetchInfoFailure((e.response && e.response.data) || e));
        }
    }
}

export function* watchScoutingActionsSaga() {
    yield all([
        takeEvery(ActionTypesScouting.FETCH_SCOUTING_REQUEST, fetchScoutingWorker),
        takeEvery(ActionTypesScouting.FETCH_INFO_REQUEST, fetchScoutingWorker)
    ]);
}
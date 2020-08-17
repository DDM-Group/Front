import {ActionTypesMasterclass} from "../masterclass";

export const ActionTypesScoutingRequest = {
    FETCH_SCOUTINGREQUEST_REQUEST: 'scoutingRequest/FETCH_scoutingRequest_REQUEST',
    FETCH_SCOUTINGREQUEST_SUCCESS: 'scoutingRequest/FETCH_scoutingRequest_SUCCESS',
    FETCH_SCOUTINGREQUEST_FAILURE: 'scoutingRequest/FETCH_scoutingRequest_FAILURE',
    FETCH_INFO_REQUEST: 'scoutingRequest/FETCH_INFO_REQUEST',
    FETCH_INFO_SUCCESS: 'scoutingRequest/FETCH_INFO_SUCCESS',
    FETCH_INFO_FAILURE: 'scoutingRequest/FETCH_INFO_FAILURE',
    REGISTER_SCOUTINGREQUEST_REQUEST: 'scoutingRequest/REGISTER_SCOUTINGREQUEST_REQUEST',
    REGISTER_SCOUTINGREQUEST_SUCCESS: 'scoutingRequest/REGISTER_SCOUTINGREQUEST_SUCCESS',
    REGISTER_SCOUTINGREQUEST_FAILURE: 'scoutingRequest/REGISTER_SCOUTINGREQUEST_FAILURE'
};

export const initialScoutingRequestState = {
    list: [],
    info: {}
};

export default function reducer(
    state = initialScoutingRequestState,
    action
) {
    switch (action.type) {

        case ActionTypesScoutingRequest.FETCH_SCOUTINGREQUEST_SUCCESS:
            return {
                ...state,
                list: action.payload
            };

        case ActionTypesScoutingRequest.FETCH_SCOUTINGREQUEST_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case ActionTypesScoutingRequest.FETCH_INFO_SUCCESS:
            return {
                ...state,
                info: action.payload
            };

        case ActionTypesScoutingRequest.FETCH_INFO_FAILURE:
            return {
                ...state,
                error: action.error
            };

        default:
            return state;
    }
}

// Action Creators
export const fetchScoutingRequestRequest = () => ({
    type: ActionTypesScoutingRequest.FETCH_SCOUTINGREQUEST_REQUEST
});

export const fetchScoutingRequestSuccess = (payload) => ({
    type: ActionTypesScoutingRequest.FETCH_SCOUTINGREQUEST_SUCCESS,
    payload
});

export const fetchScoutingRequestFailure = (error) => ({
    type: ActionTypesScoutingRequest.FETCH_SCOUTINGREQUEST_FAILURE,
    error
});

export const fetchInfoRequest = (params) => ({
    type: ActionTypesScoutingRequest.FETCH_INFO_REQUEST,
    params
});

export const fetchInfoSuccess = (payload) => ({
    type: ActionTypesScoutingRequest.FETCH_INFO_SUCCESS,
    payload
});
export const registerScoutingRequestRequest = (params) => ({
    type: ActionTypesScoutingRequest.REGISTER_SCOUTINGREQUEST_REQUEST,
    params
});
export const registerScoutingRequestSuccess = (payload) => ({
    type: ActionTypesMasterclass.REGISTER_MASTERCLASS_SUCCESS,
    payload
});

export const registerScoutingRequestFailure = (error) => ({
    type: ActionTypesMasterclass.REGISTER_MASTERCLASS_FAILURE,
    error
});

export const fetchInfoFailure = (error) => ({
    type: ActionTypesScoutingRequest.FETCH_INFO_FAILURE,
    error
});
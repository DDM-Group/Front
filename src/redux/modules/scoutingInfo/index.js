export const ActionTypesScoutingInfo = {
    FETCH_SCOUTINGINFO_REQUEST: 'scoutingInfo/FETCH_scoutingInfo_REQUEST',
    FETCH_SCOUTINGINFO_SUCCESS: 'scoutingInfo/FETCH_scoutingInfo_SUCCESS',
    FETCH_SCOUTINGINFO_FAILURE: 'scoutingInfo/FETCH_scoutingInfo_FAILURE',
    FETCH_INFO_REQUEST: 'scoutingInfo/FETCH_INFO_REQUEST',
    FETCH_INFO_SUCCESS: 'scoutingInfo/FETCH_INFO_SUCCESS',
    FETCH_INFO_FAILURE: 'scoutingInfo/FETCH_INFO_FAILURE'
};

export const initialScoutingInfoState = {
    list: [],
    info: {}
};

export default function reducer(
    state = initialScoutingInfoState,
    action
) {
    switch (action.type) {

        case ActionTypesScoutingInfo.FETCH_SCOUTINGINFO_SUCCESS:
            return {
                ...state,
                list: action.payload
            };

        case ActionTypesScoutingInfo.FETCH_SCOUTINGINFO_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case ActionTypesScoutingInfo.FETCH_INFO_SUCCESS:
            return {
                ...state,
                info: action.payload
            };

        case ActionTypesScoutingInfo.FETCH_INFO_FAILURE:
            return {
                ...state,
                error: action.error
            };

        default:
            return state;
    }
}

// Action Creators
export const fetchScoutingInfoRequest = () => ({
    type: ActionTypesScoutingInfo.FETCH_SCOUTINGINFO_REQUEST
});

export const fetchScoutingInfoSuccess = (payload) => ({
    type: ActionTypesScoutingInfo.FETCH_SCOUTINGINFO_SUCCESS,
    payload
});

export const fetchScoutingInfoFailure = (error) => ({
    type: ActionTypesScoutingInfo.FETCH_SCOUTINGINFO_FAILURE,
    error
});

export const fetchInfoRequest = (params) => ({
    type: ActionTypesScoutingInfo.FETCH_INFO_REQUEST,
    params
});

export const fetchInfoSuccess = (payload) => ({
    type: ActionTypesScoutingInfo.FETCH_INFO_SUCCESS,
    payload
});

export const fetchInfoFailure = (error) => ({
    type: ActionTypesScoutingInfo.FETCH_INFO_FAILURE,
    error
});
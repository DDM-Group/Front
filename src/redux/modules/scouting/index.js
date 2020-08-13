export const ActionTypesScouting = {
    FETCH_SCOUTING_REQUEST: 'scouting/FETCH_scouting_REQUEST',
    FETCH_SCOUTING_SUCCESS: 'scouting/FETCH_scouting_SUCCESS',
    FETCH_SCOUTING_FAILURE: 'scouting/FETCH_scouting_FAILURE',
    FETCH_INFO_REQUEST: 'scouting/FETCH_INFO_REQUEST',
    FETCH_INFO_SUCCESS: 'scouting/FETCH_INFO_SUCCESS',
    FETCH_INFO_FAILURE: 'scouting/FETCH_INFO_FAILURE'
};

export const initialScoutingState = {
    list: [],
    info: {}
};

export default function reducer(
    state = initialScoutingState,
    action
) {
    switch (action.type) {

        case ActionTypesScouting.FETCH_SCOUTING_SUCCESS:
            return {
                ...state,
                list: action.payload
            };

        case ActionTypesScouting.FETCH_SCOUTING_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case ActionTypesScouting.FETCH_INFO_SUCCESS:
            return {
                ...state,
                info: action.payload
            };

        case ActionTypesScouting.FETCH_INFO_FAILURE:
            return {
                ...state,
                error: action.error
            };

        default:
            return state;
    }
}

// Action Creators
export const fetchScoutingRequest = () => ({
    type: ActionTypesScouting.FETCH_SCOUTING_REQUEST
});

export const fetchScoutingSuccess = (payload) => ({
    type: ActionTypesScouting.FETCH_SCOUTING_SUCCESS,
    payload
});

export const fetchScoutingFailure = (error) => ({
    type: ActionTypesScouting.FETCH_SCOUTING_FAILURE,
    error
});

export const fetchInfoRequest = (params) => ({
    type: ActionTypesScouting.FETCH_INFO_REQUEST,
    params
});

export const fetchInfoSuccess = (payload) => ({
    type: ActionTypesScouting.FETCH_INFO_SUCCESS,
    payload
});

export const fetchInfoFailure = (error) => ({
    type: ActionTypesScouting.FETCH_INFO_FAILURE,
    error
});
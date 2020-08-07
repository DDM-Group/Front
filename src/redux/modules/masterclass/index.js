export const ActionTypesMasterclass = {
    FETCH_MASTERCLASS_REQUEST: 'masterclass/FETCH_MASTERCLASS_REQUEST',
    FETCH_MASTERCLASS_SUCCESS: 'masterclass/FETCH_MASTERCLASS_SUCCESS',
    FETCH_MASTERCLASS_FAILURE: 'masterclass/FETCH_MASTERCLASS_FAILURE',
    FETCH_INFO_REQUEST: 'masterclass/FETCH_INFO_REQUEST',
    FETCH_INFO_SUCCESS: 'masterclass/FETCH_INFO_SUCCESS',
    FETCH_INFO_FAILURE: 'masterclass/FETCH_INFO_FAILURE'
  };
  
  export const initialMasterclassState = {
    list: [],
    info: {}
  };
  
  export default function reducer(
    state = initialMasterclassState,
    action
  ) {
    switch (action.type) {
  
      case ActionTypesMasterclass.FETCH_MASTERCLASS_SUCCESS:
        return {
          ...state,
          list: action.payload
        };
  
      case ActionTypesMasterclass.FETCH_MASTERCLASS_FAILURE:
        return {
          ...state,
          error: action.error
        };

      case ActionTypesMasterclass.FETCH_INFO_SUCCESS:
        return {
          ...state,
          info: action.payload
        };

      case ActionTypesMasterclass.FETCH_INFO_FAILURE:
        return {
          ...state,
          error: action.error
        };
  
      default:
        return state;
    }
  }
  
  // Action Creators
  export const fetchMasterclassRequest = () => ({
    type: ActionTypesMasterclass.FETCH_MASTERCLASS_REQUEST
  });
  
  export const fetchMasterclassSuccess = (payload) => ({
    type: ActionTypesMasterclass.FETCH_MASTERCLASS_SUCCESS,
    payload
  });
  
  export const fetchMasterclassFailure = (error) => ({
    type: ActionTypesMasterclass.FETCH_MASTERCLASS_FAILURE,
    error
  });

  export const fetchInfoRequest = (params) => ({
    type: ActionTypesMasterclass.FETCH_INFO_REQUEST,
    params
  });
  
  export const fetchInfoSuccess = (payload) => ({
    type: ActionTypesMasterclass.FETCH_INFO_SUCCESS,
    payload
  });
  
  export const fetchInfoFailure = (error) => ({
    type: ActionTypesMasterclass.FETCH_INFO_FAILURE,
    error
  });
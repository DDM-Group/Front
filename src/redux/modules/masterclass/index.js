import {ActionTypesUsers} from '../users'

export const ActionTypesMasterclass = {
    FETCH_MASTERCLASS_REQUEST: 'masterclass/FETCH_MASTERCLASS_REQUEST',
    FETCH_MASTERCLASS_SUCCESS: 'masterclass/FETCH_MASTERCLASS_SUCCESS',
    FETCH_MASTERCLASS_FAILURE: 'masterclass/FETCH_MASTERCLASS_FAILURE',
    FETCH_INFO_REQUEST: 'masterclass/FETCH_INFO_REQUEST',
    FETCH_INFO_SUCCESS: 'masterclass/FETCH_INFO_SUCCESS',
    FETCH_INFO_FAILURE: 'masterclass/FETCH_INFO_FAILURE',
    REGISTER_MASTERCLASS_REQUEST: 'masterclass/REGISTER_MASTERCLASS_REQUEST',
    REGISTER_MASTERCLASS_SUCCESS: 'masterclass/REGISTER_MASTERCLASS_SUCCESS',
    REGISTER_MASTERCLASS_FAILURE: 'masterclass/REGISTER_MASTERCLASS_FAILURE'

  };

  export const initialMasterclassState = {
    list: {},
    info: {},
    message: {}
  };
  
  export default function reducer(
    state = initialMasterclassState,
    action
  ) {
    switch (action.type) {
  
      case ActionTypesMasterclass.FETCH_MASTERCLASS_SUCCESS:
        return {
          ...state,
          list: action.payload,
          message: {}
        };
      case ActionTypesMasterclass.FETCH_MASTERCLASS_FAILURE:
        return {
          ...state,
          message: { failure: true, text: action.error.message}
        };

      case ActionTypesMasterclass.FETCH_INFO_SUCCESS:
        return {
          ...state,
          info: action.payload,
          message: {}
        };
      case ActionTypesMasterclass.FETCH_INFO_FAILURE:
        return {
          ...state,
          message: { failure: true, text: action.error.message}
        };

      case ActionTypesMasterclass.REGISTER_MASTERCLASS_SUCCESS:
        return {
          ...state,
          info: action.payload,
          message: { failure: false, text: 'Вы успешно записисались на мастеркласс!' }
        }
      case ActionTypesMasterclass.REGISTER_MASTERCLASS_FAILURE:
        return {
          ...state,
          message: { failure: true, text: action.error.message}
        }

      case ActionTypesUsers.SIGN_OUT_USER_REQUEST:
        return {
          ...initialMasterclassState
        }
    
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
  
  export const registerMasterclassRequest = (params) => ({
    type: ActionTypesMasterclass.REGISTER_MASTERCLASS_REQUEST,
    params
  });
  
  export const registerMasterclassSuccess = (payload) => ({
    type: ActionTypesMasterclass.REGISTER_MASTERCLASS_SUCCESS,
    payload
  });
  
  export const registerMasterclassFailure = (error) => ({
    type: ActionTypesMasterclass.REGISTER_MASTERCLASS_FAILURE,
    error
  });
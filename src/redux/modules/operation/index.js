import {ActionTypesUsers} from '../users'

export const ActionTypesOperation = {
    FETCH_OPERATION_REQUEST: 'operation/FETCH_OPERATION_REQUEST',
    FETCH_OPERATION_SUCCESS: 'operation/FETCH_OPERATION_SUCCESS',
    FETCH_OPERATION_FAILURE: 'operation/FETCH_OPERATION_FAILURE',
    FETCH_INFO_REQUEST: 'operation/FETCH_INFO_REQUEST',
    FETCH_INFO_SUCCESS: 'operation/FETCH_INFO_SUCCESS',
    FETCH_INFO_FAILURE: 'operation/FETCH_INFO_FAILURE',
    REGISTER_OPERATION_REQUEST: 'operation/REGISTER_OPERATION_REQUEST',
    REGISTER_OPERATION_SUCCESS: 'operation/REGISTER_OPERATION_SUCCESS',
    REGISTER_OPERATION_FAILURE: 'operation/REGISTER_OPERATION_FAILURE',
    FETCH_OPERATION_VIEW_REQUEST: 'operation/FETCH_OPERATION_VIEW_REQUEST',
    FETCH_OPERATION_VIEW_SUCCESS: 'operation/FETCH_OPERATION_VIEW_SUCCESS',
    FETCH_OPERATION_VIEW_FAILURE: 'operation/FETCH_OPERATION_VIEW_FAILURE',
    ACTIVATE_USER_REQUEST: 'operation/ACTIVATE_USER_REQUEST',
    ACTIVATE_USER_SUCCESS: 'operation/ACTIVATE_USER_SUCCESS',
    ACTIVATE_USER_FAILURE: 'operation/ACTIVATE_USER_FAILURE',
    KILL_USER_REQUEST: 'operation/ACTIVATE_USER_REQUEST',
    KILL_USER_SUCCESS: 'operation/ACTIVATE_USER_SUCCESS',
    KILL_USER_FAILURE: 'operation/ACTIVATE_USER_FAILURE',
  };
  
  export const initialOperationState = {
    list: [],
    info: {},
    message: {},
    view: [],
    isLoading: false
  };
  
  export default function reducer(
    state = initialOperationState,
    action
  ) {
    console.log('action :>> ', action);
    switch (action.type) {
  
      case ActionTypesOperation.FETCH_OPERATION_SUCCESS:
        return {
          ...state,
          list: action.payload,
          message: {}
        }
      case ActionTypesOperation.FETCH_OPERATION_FAILURE:
        return {
          ...state,
          message: { failure: true, text: action.error.message}
        }

      case ActionTypesOperation.FETCH_INFO_SUCCESS:
        return {
          ...state,
          info: action.payload,
          message: {}
        }
      case ActionTypesOperation.FETCH_INFO_FAILURE:
        return {
          ...state,
          message: { failure: true, text: action.error.message}
        }

      case ActionTypesOperation.REGISTER_OPERATION_SUCCESS:
        return {
          ...state,
          info: action.payload,
          message: { failure: false, text: 'Вы успешно записисались на высадку!' }
        }
      case ActionTypesOperation.REGISTER_OPERATION_FAILURE:
        return {
          ...state,
          message: { failure: true, text: action.error.message}
        }
  
      case ActionTypesOperation.FETCH_OPERATION_VIEW_SUCCESS:
        return {
          ...state,
          isLoading: false,
          view: action.payload,
          message: {}
        }
      case ActionTypesOperation.FETCH_OPERATION_VIEW_FAILURE:
        return {
          ...state,
          isLoading: false,
          message: { failure: true, text: action.error.message}
        }

      case ActionTypesOperation.FETCH_OPERATION_VIEW_REQUEST:
        return {
          ...state,
          isLoading: true
        }

      case ActionTypesOperation.ACTIVATE_USER_SUCCESS:
        return {
          ...state,
          message: { failure: false, text: 'Вы успешно активировались!' }
        }
      case ActionTypesOperation.ACTIVATE_USER_FAILURE:
        return {
          ...state,
          message: { failure: true, text: action.error.message}
        }
      
        case ActionTypesOperation.KILL_USER_SUCCESS:
          return {
            ...state,
            message: { failure: false, text: 'Смерть подтверждена!' }
          }
        case ActionTypesOperation.KILL_USER_FAILURE:
          return {
            ...state,
            message: { failure: true, text: action.error.message}
          }

      case ActionTypesUsers.SIGN_OUT_USER_REQUEST:
        return {
          ...initialOperationState
        }

      default:
        return state;
    }
  }
  
  // Action Creators
  export const fetchOperationRequest = () => ({
    type: ActionTypesOperation.FETCH_OPERATION_REQUEST
  });
  
  export const fetchOperationSuccess = (payload) => ({
    type: ActionTypesOperation.FETCH_OPERATION_SUCCESS,
    payload
  });
  
  export const fetchOperationFailure = (error) => ({
    type: ActionTypesOperation.FETCH_OPERATION_FAILURE,
    error
  });

  export const fetchInfoRequest = (params) => ({
    type: ActionTypesOperation.FETCH_INFO_REQUEST,
    params
  });
  
  export const fetchInfoSuccess = (payload) => ({
    type: ActionTypesOperation.FETCH_INFO_SUCCESS,
    payload
  });
  
  export const fetchInfoFailure = (error) => ({
    type: ActionTypesOperation.FETCH_INFO_FAILURE,
    error
  });
  
  export const registerOperationRequest = (params) => ({
    type: ActionTypesOperation.REGISTER_OPERATION_REQUEST,
    params
  });
  
  export const registerOperationSuccess = (payload) => ({
    type: ActionTypesOperation.REGISTER_OPERATION_SUCCESS,
    payload
  });
  
  export const registerOperationFailure = (error) => ({
    type: ActionTypesOperation.REGISTER_OPERATION_FAILURE,
    error
  });

  
  export const fetchOperationViewRequest = () => ({
    type: ActionTypesOperation.FETCH_OPERATION_VIEW_REQUEST
  });
  
  export const fetchOperationViewSuccess = (payload) => ({
    type: ActionTypesOperation.FETCH_OPERATION_VIEW_SUCCESS,
    payload
  });
  
  export const fetchOperationViewFailure = (error) => ({
    type: ActionTypesOperation.FETCH_OPERATION_VIEW_FAILURE,
    error
  });
  
  export const activateUserRequest = (params) => ({
    type: ActionTypesOperation.ACTIVATE_USER_REQUEST,
    params
  });
  
  export const activateUserSuccess = () => ({
    type: ActionTypesOperation.ACTIVATE_USER_SUCCESS
  });
  
  export const activateUserFailure = (error) => ({
    type: ActionTypesOperation.ACTIVATE_USER_FAILURE,
    error
  });

  export const killUserRequest = (params) => ({
    type: ActionTypesOperation.KILL_USER_REQUEST,
    params
  });
  
  export const killUserSuccess = () => ({
    type: ActionTypesOperation.KILL_USER_SUCCESS
  });
  
  export const killUserFailure = (error) => ({
    type: ActionTypesOperation.KILL_USER_FAILURE,
    error
  });
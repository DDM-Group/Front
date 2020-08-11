export const ActionTypesOperation = {
    FETCH_OPERATION_REQUEST: 'masterclass/FETCH_OPERATION_REQUEST',
    FETCH_OPERATION_SUCCESS: 'masterclass/FETCH_OPERATION_SUCCESS',
    FETCH_OPERATION_FAILURE: 'masterclass/FETCH_OPERATION_FAILURE',
    FETCH_INFO_REQUEST: 'masterclass/FETCH_INFO_REQUEST',
    FETCH_INFO_SUCCESS: 'masterclass/FETCH_INFO_SUCCESS',
    FETCH_INFO_FAILURE: 'masterclass/FETCH_INFO_FAILURE',
    REGISTER_OPERATION_REQUEST: 'masterclass/REGISTER_OPERATION_REQUEST',
    REGISTER_OPERATION_SUCCESS: 'masterclass/REGISTER_OPERATION_SUCCESS',
    REGISTER_OPERATION_FAILURE: 'masterclass/REGISTER_OPERATION_FAILURE',
    FETCH_OPERATION_VIEW_REQUEST: 'masterclass/FETCH_OPERATION_VIEW_REQUEST',
    FETCH_OPERATION_VIEW_SUCCESS: 'masterclass/FETCH_OPERATION_VIEW_SUCCESS',
    FETCH_OPERATION_VIEW_FAILURE: 'masterclass/FETCH_OPERATION_VIEW_FAILURE',

  };
  
  export const initialOperationState = {
    list: [],
    info: {},
    message: {},
    view: []
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
        };
      case ActionTypesOperation.FETCH_OPERATION_FAILURE:
        return {
          ...state,
          message: { failure: true, text: action.error.message}
        };

      case ActionTypesOperation.FETCH_INFO_SUCCESS:
        return {
          ...state,
          info: action.payload,
          message: {}
        };
      case ActionTypesOperation.FETCH_INFO_FAILURE:
        return {
          ...state,
          message: { failure: true, text: action.error.message}
        };

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
          view: action.payload,
          message: {}
        };
      case ActionTypesOperation.FETCH_OPERATION_VIEW_FAILURE:
        return {
          ...state,
          message: { failure: true, text: action.error.message}
        };

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
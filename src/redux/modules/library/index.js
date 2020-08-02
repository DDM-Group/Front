export const ActionTypesLibrary = {
    FETCH_LIBRARY_REQUEST: 'library/FETCH_LIBRARY_REQUEST',
    FETCH_LIBRARY_SUCCESS: 'library/FETCH_LIBRARY_SUCCESS',
    FETCH_LIBRARY_FAILURE: 'library/FETCH_LIBRARY_FAILURE',
    FETCH_INFO_REQUEST: 'library/FETCH_INFO_REQUEST',
    FETCH_INFO_SUCCESS: 'library/FETCH_INFO_SUCCESS',
    FETCH_INFO_FAILURE: 'library/FETCH_INFO_FAILURE'
  };
  
  export const initialLibraryState = {
    list: [],
    info: {}
  };
  
  export default function reducer(
    state = initialLibraryState,
    action
  ) {
    switch (action.type) {
  
      case ActionTypesLibrary.FETCH_LIBRARY_SUCCESS:
        return {
          ...state,
          list: action.payload
        };
  
      case ActionTypesLibrary.FETCH_LIBRARY_FAILURE:
        return {
          ...state,
          error: action.error
        };

      case ActionTypesLibrary.FETCH_INFO_SUCCESS:
        return {
          ...state,
          info: action.payload
        };

      case ActionTypesLibrary.FETCH_INFO_FAILURE:
        return {
          ...state,
          error: action.error
        };
  
      default:
        return state;
    }
  }
  
  // Action Creators
  export const fetchLibraryRequest = () => ({
    type: ActionTypesLibrary.FETCH_LIBRARY_REQUEST
  });
  
  export const fetchLibrarySuccess = (payload) => ({
    type: ActionTypesLibrary.FETCH_LIBRARY_SUCCESS,
    payload
  });
  
  export const fetchLibraryFailure = (error) => ({
    type: ActionTypesLibrary.FETCH_LIBRARY_FAILURE,
    error
  });

  export const fetchInfoRequest = (params) => ({
    type: ActionTypesLibrary.FETCH_INFO_REQUEST,
    params
  });
  
  export const fetchInfoSuccess = (payload) => ({
    type: ActionTypesLibrary.FETCH_INFO_SUCCESS,
    payload
  });
  
  export const fetchInfoFailure = (error) => ({
    type: ActionTypesLibrary.FETCH_INFO_FAILURE,
    error
  });
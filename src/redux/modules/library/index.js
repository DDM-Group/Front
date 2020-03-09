export const ActionTypesLibrary = {
    FETCH_LIBRARY_REQUEST: 'library/FETCH_LIBRARY_REQUEST',
    FETCH_LIBRARY_SUCCESS: 'library/FETCH_LIBRARY_SUCCESS',
    FETCH_LIBRARY_FAILURE: 'library/FETCH_LIBRARY_FAILURE'
  };
  
  export const initialLibraryState = {
    list: []
  };
  
  export default function reducer(
    state = initialLibraryState,
    action
  ) {
  
    switch (action.type) {
  
      case ActionTypesLibrary.FETCH_LIBRARY_SUCCESS:
        return {
          ...state,
          list: action.payload.data
        };
  
      case ActionTypesLibrary.FETCH_LIBRARY_FAILURE:
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
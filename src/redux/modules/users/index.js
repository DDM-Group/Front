export const ActionTypesUsers = {
    SIGN_UP_USER_REQUEST: 'users/SIGN_UP_USER_REQUEST',
    SIGN_UP_USER_SUCCESS: 'users/SIGN_UP_USER_SUCCESS',
    SIGN_UP_USER_FAILURE: 'users/SIGN_UP_USER_FAILURE',

    SIGN_IN_USER_REQUEST: 'users/SIGN_IN_USER_REQUEST',
    SIGN_IN_USER_SUCCESS: 'users/SIGN_IN_USER_SUCCESS',
    SIGN_IN_USER_FAILURE: 'users/SIGN_IN_USER_FAILURE',
//autoupdate
    AUTOUPDATE_USER_REQUEST: 'users/AUTOUPDATE_USER_REQUEST',
    AUTOUPDATE_USER_SUCCESS: 'users/AUTOUPDATE_USER_SUCCESS',
    AUTOUPDATE_USER_FAILURE: 'users/AUTOUPDATE_USER_FAILURE',

    SIGN_OUT_USER_REQUEST: 'users/SIGN_OUT_USER_REQUEST',

    FETCH_USER_PAGE_REQUEST: 'users/FETCH_USER_PAGE_REQUEST',
    FETCH_USER_PAGE_SUCCESS: 'users/FETCH_USER_PAGE_SUCCESS',
    FETCH_USER_PAGE_FAILURE: 'users/FETCH_USER_PAGE_FAILURE',
};

export const initialUserState = {
    loggedIn: false,
    user: {}
};

export default function reducer(
    state = initialUserState,
    action
) {
    switch (action.type) {
        //TODO: add sign_up with msg or err
        case ActionTypesUsers.SIGN_IN_USER_SUCCESS:
          const {accessToken, ...user} = action.payload;
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("token", accessToken)
          return {
            loggedIn: true,
            user
          }
        case ActionTypesUsers.SIGN_IN_USER_FAILURE: 
          return {
            loggedIn: false,
            error: action.error
        }
        case ActionTypesUsers.SIGN_OUT_USER_REQUEST:
          localStorage.clear()
          return {
            loggedIn: false,
            user: {}
        }
        case ActionTypesUsers.AUTOUPDATE_USER_SUCCESS:
          return {
            loggedIn: false,
            user: action.payload
          }
        case ActionTypesUsers.AUTOUPDATE_USER_FAILURE:
          return {
            loggedIn: false,
            user: {}
          }

        case ActionTypesUsers.FETCH_USER_PAGE_SUCCESS:
          return {
            ...state,
            page: action.payload
          }
        case ActionTypesUsers.FETCH_USER_PAGE_FAILURE:
          return {
            ...state,
            error: action.error
          }
        
        default: 
          return state;
    }
}

// Action Creators
export const signUpUserRequest = (userInfo) => ({
  type: ActionTypesUsers.SIGN_UP_USER_REQUEST,
  userInfo
})
export const signUpUserSuccess = (payload) => ({
  type: ActionTypesUsers.SIGN_UP_USER_SUCCESS,
  payload
})
export const signUpUserFailure = (error) => ({
  type: ActionTypesUsers.SIGN_UP_USER_FAILURE,
  error
})

export const signInUserRequest = (userInfo) => ({
  type: ActionTypesUsers.SIGN_IN_USER_REQUEST,
  userInfo
})
export const signInUserSuccess = (payload) => ({
  type: ActionTypesUsers.SIGN_IN_USER_SUCCESS,
  payload
})
export const signInUserFailure = (error) => ({
  type: ActionTypesUsers.SIGN_IN_USER_FAILURE,
  error
})

export const autoupdateUserRequest = () => ({
  type: ActionTypesUsers.AUTOUPDATE_USER_REQUEST
})
export const autoupdateUserSuccess = (payload) => ({
  type: ActionTypesUsers.AUTOUPDATE_USER_SUCCESS,
  payload
})
export const autoupdateUserFailure = (error) => ({
  type: ActionTypesUsers.AUTOUPDATE_USER_FAILURE,
  error
})

export const signOutUserRequest = () => ({
  type: ActionTypesUsers.SIGN_OUT_USER_REQUEST
})

export const fetchUserPageRequest = (userId) => ({
  type: ActionTypesUsers.FETCH_USER_PAGE_REQUEST,
  userId
})
export const fetchUserPageSuccess = (payload) => ({
  type: ActionTypesUsers.FETCH_USER_PAGE_SUCCESS,
  payload
})
export const fetchUserPageFailure = (error) => ({
  type: ActionTypesUsers.FETCH_USER_PAGE_FAILURE,
  error
})
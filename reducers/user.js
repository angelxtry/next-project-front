export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

const initialState = {
  isLoggedIn: false,
  isLoggingIn: false,
  loginError: '',
  isLoggedOut: false,
  isLoggingOut: false,
  logoutError: '',
  // isLoadedUser: false,
  // isLoadingUser: false,
  loadUserError: '',
  isSignedUp: false,
  isSigningUp: false,
  signUpError: '',
  me: null,
  signUpData: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSignedUp: false,
        isSigningUp: true,
        signUpErrorReason: ''
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isSignedUp: true,
        isSigningUp: false
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        isSignedUp: false,
        isSigningUp: false,
        signUpError: action.error
      };
    }
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: true,
        me: null,
        loginError: ''
      };
    }
    case LOG_IN_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        me: action.payload.data
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        me: null,
        loginError: action.error
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        loginError: ''
      };
    }
    case LOG_OUT_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        isLoggedIn: false,
        me: null
      };
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        logoutError: action.error
      };
    }
    case LOAD_USER_REQUEST: {
      return {
        ...state,
        loadUserError: ''
      };
    }
    case LOAD_USER_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        isLoggedIn: true,
        me: action.payload.data
      };
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state,
        me: null,
        loadUserError: action.error
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

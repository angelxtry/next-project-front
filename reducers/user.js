export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';

const initialState = {
  isLoggedIn: false,
  isLoggingIn: false,
  loginError: '',
  isSignedUp: false,
  isSigningUp: false,
  signUpError: '',
  me: null,
  signUpData: null
};

const dummyUser = {
  nickname: 'dummy user',
  myCafes: [{}, {}],
  Post: [],
  Followings: [],
  Followers: []
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
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        me: dummyUser
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
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        me: null
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

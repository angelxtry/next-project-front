export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';

const initialState = {
  isLoggedIn: false,
  user: null,
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
        signUpData: action.payload
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state
      };
    }
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        user: dummyUser
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

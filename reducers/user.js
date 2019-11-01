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

export const LOAD_OTHER_USER_REQUEST = 'LOAD_OTHER_USER_REQUEST';
export const LOAD_OTHER_USER_SUCCESS = 'LOAD_OTHER_USER_SUCCESS';
export const LOAD_OTHER_USER_FAILURE = 'LOAD_OTHER_USER_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const EDIT_NICKNAME_REQUEST = 'EDIT_NICKNAME_REQUEST';
export const EDIT_NICKNAME_SUCCESS = 'EDIT_NICKNAME_SUCCESS';
export const EDIT_NICKNAME_FAILURE = 'EDIT_NICKNAME_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

const initialState = {
  isLoggedIn: false,
  isLoggingIn: false,
  loginError: '',
  isLoggedOut: false,
  isLoggingOut: false,
  logoutError: '',
  loadUserError: '',
  loadOtherUserError: '',
  isSignedUp: false,
  isSigningUp: false,
  signUpError: '',
  me: null, // 내정보
  userInfo: null, // 다른 유저 정보
  signUpData: null,
  followingList: [],
  followerList: []
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
    case LOAD_OTHER_USER_REQUEST: {
      return {
        ...state,
        loadOtherUserError: ''
      };
    }
    case LOAD_OTHER_USER_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload.data
      };
    }
    case LOAD_OTHER_USER_FAILURE: {
      return {
        ...state,
        userInfo: null,
        loadOtherUserError: action.error
      };
    }
    case FOLLOW_USER_REQUEST: {
      return {
        ...state
      };
    }
    case FOLLOW_USER_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followings: [{ id: action.data }, ...state.me.Followings]
        },
        followingList: state.followingList.filter((v) => v.id !== action.data)
      };
    }
    case FOLLOW_USER_FAILURE: {
      return {
        ...state
      };
    }
    case UNFOLLOW_USER_REQUEST: {
      return {
        ...state
      };
    }
    case UNFOLLOW_USER_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followings: state.me.Followings.filter((v) => v.id !== action.data)
        },
        followingList: state.followingList.filter((v) => v.id !== action.data)
      };
    }
    case UNFOLLOW_USER_FAILURE: {
      return {
        ...state
      };
    }
    case ADD_POST_TO_ME: {
      return {
        ...state,
        me: {
          ...state.me,
          Posts: [{ id: action.payload }, ...state.me.Posts]
        }
      };
    }
    case LOAD_FOLLOWERS_REQUEST: {
      return {
        ...state
      };
    }
    case LOAD_FOLLOWERS_SUCCESS: {
      return {
        ...state,
        followerList: action.data
      };
    }
    case LOAD_FOLLOWERS_FAILURE: {
      return {
        ...state
      };
    }
    case LOAD_FOLLOWINGS_REQUEST: {
      return {
        ...state
      };
    }
    case LOAD_FOLLOWINGS_SUCCESS: {
      return {
        ...state,
        followingList: action.data
      };
    }
    case LOAD_FOLLOWINGS_FAILURE: {
      return {
        ...state
      };
    }
    case REMOVE_FOLLOWER_REQUEST: {
      return {
        ...state
      };
    }
    case REMOVE_FOLLOWER_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followers: state.me.Followers.filter((v) => v.id !== action.data)
        },
        followerList: state.followerList.filter((v) => v.id !== action.data)
      };
    }
    case REMOVE_FOLLOWER_FAILURE: {
      return {
        ...state
      };
    }
    case EDIT_NICKNAME_REQUEST: {
      return {
        ...state,
        isEditingNickname: true,
        editNicknameErrorReason: ''
      };
    }
    case EDIT_NICKNAME_SUCCESS: {
      return {
        ...state,
        isEditingNickname: false,
        me: {
          ...state.me,
          nickname: action.data
        }
      };
    }
    case EDIT_NICKNAME_FAILURE: {
      return {
        ...state,
        isEditingNickname: false,
        editNicknameErrorReason: action.error
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

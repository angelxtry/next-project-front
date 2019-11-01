export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

const initialState = {
  isAddingPost: false,
  isAddedPost: false,
  addPostError: '',
  isAddingComment: false,
  isAddedComment: false,
  addCommentError: '',
  loadMainPostsError: '',
  retweetError: '',
  mainPosts: [],
  imagePaths: [] // 미리보기 이미지 경로
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST: {
      return {
        ...state,
        isAddingPost: true,
        isAddedPost: false,
        addPostError: ''
      };
    }
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        isAddingPost: false,
        isAddedPost: true,
        mainPosts: [action.payload.data, ...state.mainPosts],
        imagePaths: []
      };
    }
    case ADD_POST_FAILURE: {
      return {
        ...state,
        isAddingPost: false,
        isAddedPost: false,
        addPostError: action.error
      };
    }
    case ADD_COMMENT_REQUEST: {
      return {
        ...state,
        isAddingComment: true,
        isAddedComment: false,
        addCommentError: ''
      };
    }
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.payload.postId
      );
      const post = state.mainPosts[postIndex];
      const comments = [...post.comments, action.payload.comments.data];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, comments };
      return {
        ...state,
        isAddingComment: false,
        isAddedComment: true,
        mainPosts
      };
    }
    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        isAddingComment: false,
        isAddedComment: false,
        addCommentError: action.error
      };
    }
    case LOAD_COMMENTS_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.payload.postId
      );
      const post = state.mainPosts[postIndex];
      const comments = action.payload.comments.data;
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, comments };
      return {
        ...state,
        mainPosts
      };
    }
    case LOAD_MAIN_POSTS_REQUEST:
    case LOAD_HASHTAG_POSTS_REQUEST:
    case LOAD_USER_POSTS_REQUEST: {
      return {
        ...state,
        mainPosts: [],
        loadMainPostsError: ''
      };
    }
    case LOAD_MAIN_POSTS_SUCCESS:
    case LOAD_HASHTAG_POSTS_SUCCESS:
    case LOAD_USER_POSTS_SUCCESS: {
      return {
        ...state,
        mainPosts: action.payload.data
      };
    }
    case LOAD_MAIN_POSTS_FAILURE:
    case LOAD_HASHTAG_POSTS_FAILURE:
    case LOAD_USER_POSTS_FAILURE: {
      return {
        ...state,
        loadMainPostsError: action.error
      };
    }
    case UPLOAD_IMAGES_REQUEST: {
      return {
        ...state
      };
    }
    case UPLOAD_IMAGES_SUCCESS: {
      return {
        ...state,
        imagePaths: [...state.imagePaths, ...action.payload.data]
      };
    }
    case UPLOAD_IMAGES_FAILURE: {
      return {
        ...state
      };
    }
    case LIKE_POST_REQUEST: {
      return {
        ...state
      };
    }
    case LIKE_POST_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.payload.postId
      );
      const post = state.mainPosts[postIndex];
      const Likers = [{ id: action.payload.userId }, ...post.Likers];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, Likers };
      return {
        ...state,
        mainPosts
      };
    }
    case LIKE_POST_FAILURE: {
      return {
        ...state
      };
    }
    case UNLIKE_POST_REQUEST: {
      return {
        ...state
      };
    }
    case UNLIKE_POST_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.payload.postId
      );
      const post = state.mainPosts[postIndex];
      const Likers = post.Likers.filter((v) => v.id !== action.payload.userId);
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, Likers };
      return {
        ...state,
        mainPosts
      };
    }
    case UNLIKE_POST_FAILURE: {
      return {
        ...state
      };
    }
    case RETWEET_REQUEST: {
      return {
        ...state
      };
    }
    case RETWEET_SUCCESS: {
      return {
        ...state,
        mainPosts: [action.payload.data, ...state.mainPosts]
      };
    }
    case RETWEET_FAILURE: {
      return {
        ...state,
        retweetError: action.error
      };
    }
    case REMOVE_IMAGE: {
      return {
        ...state,
        imagePaths: state.imagePaths.filter((v, i) => i !== action.index)
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

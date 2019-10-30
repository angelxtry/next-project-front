export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

const initialState = {
  isAddingPost: false,
  isAddedPost: false,
  addPostError: '',
  isAddingComment: false,
  isAddedComment: false,
  addCommentError: '',
  loadMainPostsError: '',
  mainPosts: []
};

const dummyComment = {
  id: 1,
  User: {
    id: 1,
    nickname: 'angelx'
  },
  createdAt: new Date(),
  content: 'This is Comment.'
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
      console.log(action.payload.data);
      return {
        ...state,
        isAddingPost: false,
        isAddedPost: true,
        mainPosts: [action.payload.data, ...state.mainPosts]
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
      const comments = [...post.comments, dummyComment];
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
    case LOAD_MAIN_POSTS_REQUEST: {
      return {
        ...state,
        mainPosts: [],
        loadMainPostsError: ''
      };
    }
    case LOAD_MAIN_POSTS_SUCCESS: {
      return {
        ...state,
        mainPosts: action.payload.data
      };
    }
    case LOAD_MAIN_POSTS_FAILURE: {
      return {
        ...state,
        loadMainPostsError: action.error
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

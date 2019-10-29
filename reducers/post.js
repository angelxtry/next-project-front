export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

const initialState = {
  isAddingPost: false,
  isAddedPost: false,
  addPostError: '',
  isAddingComment: false,
  isAddedComment: false,
  addCommentError: '',
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'angelx'
      },
      content: 'Study hard!',
      img: '',
      comments: []
    },
    {
      id: 2,
      User: {
        id: 1,
        nickname: 'angelx'
      },
      content: 'Make money!',
      img: '',
      comments: []
    }
  ]
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

const dummyPost = {
  id: 3,
  User: {
    id: 1,
    nickname: 'angelx'
  },
  content: 'Make money more',
  img: ''
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
        mainPosts: [dummyPost, ...state.mainPosts]
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
    default: {
      return state;
    }
  }
};

export default reducer;

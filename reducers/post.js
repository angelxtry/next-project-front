const ADD_POST_REQUEST = 'ADD_POST_REQUEST';

const initialState = {
  mainPosts: [
    {
      postId: 1,
      User: {
        id: 1,
        nickname: 'angelx'
      },
      content: 'Study hard!',
      img: ''
    },
    {
      postId: 2,
      User: {
        id: 1,
        nickname: 'angelx'
      },
      content: 'Make money!',
      img: ''
    }
  ]
};

const dummyPost = {
    postId: 2,
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
        ...state
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

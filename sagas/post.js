import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_MAIN_POSTS_REQUEST
} from '../reducers/post';

// ADD POST
function addPostAPI(postData) {
  return axios.post('/post', postData, { withCredentials: true });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.payload);
    yield put({
      type: ADD_POST_SUCCESS,
      payload: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({ type: ADD_POST_FAILURE, error });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

// LOAD MAIN POSTS
function loadMainPostsAPI() {
  return axios.get('/posts');
}

function* loadMainPosts() {
  try {
    const result = yield call(loadMainPostsAPI);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      payload: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({ type: LOAD_MAIN_POSTS_FAILURE, error });
  }
}

function* watchLoadMainPosts() {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

// ADD COMMENT
function addCommentAPI() {
  return true;
}

function* addComment(action) {
  try {
    // yield call(addCommentAPI);
    yield delay(2000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      payload: {
        postId: action.payload.postId
      }
    });
  } catch (error) {
    console.error(error);
    yield put({ type: ADD_COMMENT_FAILURE, error });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* postSaga() {
  yield all([fork(watchAddPost), fork(watchLoadMainPosts), fork(watchAddComment)]);
}

export default postSaga;

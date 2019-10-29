import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';

import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE
} from '../reducers/post';

// ADD POST
function addPostAPI() {
  return true;
}

function* addPost() {
  try {
    // yield call(addPostAPI);
    yield delay(2000);
    yield put({ type: ADD_POST_SUCCESS });
  } catch (error) {
    console.error(error);
    yield put({ type: ADD_POST_FAILURE, error });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
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
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}

export default postSaga;

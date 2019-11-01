import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
} from '../reducers/post';
import { ADD_POST_TO_ME } from '../reducers/user';

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
    yield put({
      type: ADD_POST_TO_ME,
      payload: result.data.id,
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

// LOAD HASHTAG POSTS
function loadHashtagPostsAPI({ tag }) {
  return axios.get(`/hashtag/${tag}`);
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.payload);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      payload: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({ type: LOAD_HASHTAG_POSTS_FAILURE, error });
  }
}

function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

// LOAD USER POST
function loadUserPostsAPI(id) {
  return axios.get(`/user/${id}/posts`);
}

// function loadUserPostsAPI({ id }) {
//   return axios.get(`/user/${id}/posts`);
// }

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      payload: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({ type: LOAD_USER_POSTS_FAILURE, error });
  }
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}
// ADD COMMENT
function addCommentAPI({ postId, content }) {
  return axios.post(
    `/post/${postId}/comment`,
    { content },
    { withCredentials: true }
  );
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.payload);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      payload: {
        postId: action.payload.postId,
        comments: result.data
      }
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function loadCommentsAPI({ postId }) {
  return axios.get(`/post/${postId}/comments`);
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.payload);
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      payload: {
        postId: action.payload.postId,
        comments: result.data
      }
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error
    });
  }
}

function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}

function uploadImagesAPI(formData) {
  return axios.post('/post/images', formData, {
    withCredentials: true
  });
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.payload);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      payload: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function likePostAPI(postId) {
  return axios.post(`/post/${postId}/like`, {}, { withCredentials: true });
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.payload);
    yield put({
      type: LIKE_POST_SUCCESS,
      payload: {
        postId: action.payload,
        userId: result.data.userId
      }
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LIKE_POST_FAILURE,
      error
    });
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function unlikePostAPI(postId) {
  return axios.delete(`/post/${postId}/like`, {
    withCredentials: true
  });
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.payload);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      payload: {
        postId: action.payload,
        userId: result.data.userId
      }
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error
    });
  }
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function retweetAPI(postId) {
  return axios.post(`/post/${postId}/retweet`, {}, { withCredentials: true });
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.payload);
    yield put({
      type: RETWEET_SUCCESS,
      payload: result.data
    });
  } catch (error) {
    console.error(error.response);
    yield put({
      type: RETWEET_FAILURE,
      error
    });
    alert(error.response && error.response.data.message);
  }
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchLoadMainPosts),
    fork(watchLoadHashtagPosts),
    fork(watchLoadUserPosts),
    fork(watchAddComment),
    fork(watchLoadComments),
    fork(watchUploadImages),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchRetweet)
  ]);
}

export default postSaga;

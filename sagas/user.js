import {
  all,
  fork,
  takeLatest,
  takeEvery,
  call,
  put,
  delay
} from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_OTHER_USER_SUCCESS,
  LOAD_OTHER_USER_FAILURE,
  LOAD_OTHER_USER_REQUEST,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  EDIT_NICKNAME_REQUEST,
  EDIT_NICKNAME_SUCCESS,
  EDIT_NICKNAME_FAILURE
} from '../reducers/user';
import user from '../pages/user';

// LOGIN
function loginAPI(loginData) {
  return axios.post('/user/login', loginData, { withCredentials: true });
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.payload);
    yield put({ type: LOG_IN_SUCCESS, payload: result.data });
  } catch (error) {
    console.error(error);
    yield put({ type: LOG_IN_FAILURE, error });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

// SIGNUP
function signUpAPI(signUpData) {
  return axios.post('/user', signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.payload);
    // yield delay(2000);
    yield put({ type: SIGN_UP_SUCCESS });
  } catch (error) {
    console.error(error);
    yield put({ type: SIGN_UP_FAILURE, error });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

// LOGOUT
function logoutAPI() {
  return axios.post('/user/logout', {}, { withCredentials: true });
}

function* logout() {
  try {
    yield call(logoutAPI);
    yield put({ type: LOG_OUT_SUCCESS });
  } catch (error) {
    console.error(error);
    yield put({ type: LOG_OUT_FAILURE, error });
  }
}

function* watchLogout() {
  yield takeEvery(LOG_OUT_REQUEST, logout);
}

// LOAD USER
function loadUserAPI() {
  return axios.get('/user', { withCredentials: true });
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    // console.log(result.data);
    yield put({ type: LOAD_USER_SUCCESS, payload: result.data });
  } catch (error) {
    console.error(error);
    yield put({ type: LOAD_USER_FAILURE, error });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

// LOAD OTHER USER
function loadOtherUserAPI({ id }) {
  return axios.get(`/user/${id}`, { withCredentials: true });
}

function* loadOtherUser(action) {
  try {
    const result = yield call(loadOtherUserAPI, action.payload);
    // console.log(result.data);
    yield put({ type: LOAD_OTHER_USER_SUCCESS, payload: result.data });
  } catch (error) {
    console.error(error);
    yield put({ type: LOAD_OTHER_USER_FAILURE, error });
  }
}

function* watchLoadOtherUser() {
  yield takeLatest(LOAD_OTHER_USER_REQUEST, loadOtherUser);
}

function followAPI(userId) {
  return axios.post(`/user/${userId}/follow`, {}, { withCredentials: true });
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_USER_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FOLLOW_USER_FAILURE,
      error: e
    });
  }
}

function* watchFollow() {
  yield takeEvery(FOLLOW_USER_REQUEST, follow);
}

function unfollowAPI(userId) {
  return axios.delete(`/user/${userId}/follow`, { withCredentials: true });
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error: e
    });
  }
}

function* watchUnfollow() {
  yield takeEvery(UNFOLLOW_USER_REQUEST, unfollow);
}

function loadFollowersAPI(userId) {
  return axios.get(`/user/${userId}/followers`, {
    withCredentials: true
  });
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: e
    });
  }
}

function* watchLoadFollowers() {
  yield takeEvery(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function loadFollowingsAPI(userId) {
  return axios.get(`/user/${userId}/followings`, {
    withCredentials: true
  });
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: e
    });
  }
}

function* watchLoadFollowings() {
  yield takeEvery(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function removeFollowerAPI(userId) {
  return axios.delete(`/user/${userId}/follower`, {
    withCredentials: true
  });
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: e
    });
  }
}

function* watchRemoveFollower() {
  yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function editNicknameAPI(nickname) {
  return axios.patch('/user/nickname', { nickname }, { withCredentials: true });
}

function* editNickname(action) {
  try {
    const result = yield call(editNicknameAPI, action.data);
    yield put({
      type: EDIT_NICKNAME_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: EDIT_NICKNAME_FAILURE,
      error: e
    });
  }
}

function* watchEditNickname() {
  yield takeEvery(EDIT_NICKNAME_REQUEST, editNickname);
}

function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchLogout),
    fork(watchLoadUser),
    fork(watchLoadOtherUser),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
    fork(watchEditNickname)
  ]);
}

export default userSaga;

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
  LOAD_USER_REQUEST
} from '../reducers/user';

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
    yield put({ type: LOAD_USER_SUCCESS, payload: result.data });
  } catch (error) {
    console.error(error);
    yield put({ type: LOAD_USER_FAILURE, error });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchLogout),
    fork(watchLoadUser)
  ]);
}

export default userSaga;

import { all, fork, takeLatest, takeEvery, call, put, delay } from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from '../reducers/user';

// LOGIN
function loginAPI() {
  // 서버 api 호출
  return true;
}

function* login() {
  try {
    // yield call(loginAPI);
    yield delay(2000);
    yield put({ type: LOG_IN_SUCCESS });
  } catch (error) {
    console.error(error);
    yield put({ type: LOG_IN_FAILURE, error });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

// SIGNUP
function signUpAPI() {
  return true;
}

function* signUp() {
  try {
    // yield call(signUpAPI);
    yield delay(2000);
    yield put({ type: SIGN_UP_SUCCESS });
  } catch (error) {
    console.error(error);
    yield put({ type: SIGN_UP_FAILURE, error });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function* userSaga() {
  yield all([fork(watchLogin), fork(watchSignUp)]);
}

export default userSaga;

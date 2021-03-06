import { all, call } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';
import post from './post';

axios.defaults.baseURL = 'http://localhost:8080/api';

function* rootSaga() {
  yield all([call(user), call(post)]);
}

export default rootSaga;

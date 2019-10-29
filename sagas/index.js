import { all, call } from 'redux-saga/effects';
import user from './user';
import post from './post';

function* rootSaga() {
  yield all([call(user), call(post)]);
}

export default rootSaga;

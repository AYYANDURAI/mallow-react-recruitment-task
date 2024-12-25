import { all } from 'redux-saga/effects';
import usersSaga from './Features/Users/usersSaga';
import deleteUserSaga from './Features/DeleteUser/deleteUserSaga';
import addUserSaga from './Features/AddUser/addUserSaga';
import editUserSaga from './Features/EditUser/editUserSaga';
import authSaga from './Features/Auth/authSaga'

export default function* rootSaga(): Generator {
  yield all([
    yield all([usersSaga(), deleteUserSaga(), addUserSaga(), editUserSaga(), authSaga()])
  ]);
}

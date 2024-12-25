import { call, Effect, put, takeEvery } from 'redux-saga/effects';
import { deleteUserSuccess, deleteUserFailure } from './deleteUsersSlice';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ApiResponse {
  data: User[]; // The API response has a 'data' field that is an array of users
  status: string;
}

const deleteUserAPI = async(id: any) => {
    const res = await axios.delete(`https://reqres.in/api/users/${id}`);
    console.log(res)
    return res;
}

function* deleteUserSaga(action: any): Generator<Effect, void, ApiResponse> {
  try {
    const { id } = action.payload;
    const user = yield call(deleteUserAPI, id);  // API call to fetch user
    yield put(deleteUserSuccess({data: user.data, status: user.status}));  // Dispatch success action with user data
  } catch (error) {
    const typedError = error as Error;
    yield put(deleteUserFailure(typedError.message));  // Dispatch failure action
  }
}

function* watchDeleteUser() {
  yield takeEvery('delete/deleteUser', deleteUserSaga);  // Watch for fetchUserStart action
}

export default watchDeleteUser;

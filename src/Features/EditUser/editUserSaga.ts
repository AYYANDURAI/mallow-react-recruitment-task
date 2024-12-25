import { call, Effect, put, takeEvery } from 'redux-saga/effects';
import { editUserSuccess, editUserFailure } from './editUsersSlice';
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

const editUserAPI = async(data: any) => {
    console.log(data, "data")
    const res = await axios.put(`https://reqres.in/api/users/${data.id}`, data);
    return res;
}

function* editUserSaga(action: any): Generator<Effect, void, ApiResponse> {
  try {
    const { values } = action.payload;
    const user = yield call(editUserAPI, values);  // API call to fetch user
    yield put(editUserSuccess({data: user.data, status: user.status}));  // Dispatch success action with user data
  } catch (error) {
    const typedError = error as Error;
    yield put(editUserFailure(typedError.message));  // Dispatch failure action
  }
}

function* watchAddUser() {
  yield takeEvery('edit/editUser', editUserSaga);  // Watch for fetchUserStart action
}

export default watchAddUser;

import { call, Effect, put, takeEvery } from 'redux-saga/effects';
import { addUserSuccess, addUserFailure } from './addUsersSlice';
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

const addUserAPI = async(data: any) => {
    const res = await axios.post(`https://reqres.in/api/users`, data);
    console.log(res)
    return res;
}

function* addUserSaga(action: any): Generator<Effect, void, ApiResponse> {
  try {
    const { id } = action.payload;
    const user = yield call(addUserAPI, id);  // API call to fetch user
    yield put(addUserSuccess({data: user.data, status: user.status}));  // Dispatch success action with user data
  } catch (error) {
    const typedError = error as Error;
    yield put(addUserFailure(typedError.message));  // Dispatch failure action
  }
}

function* watchAddUser() {
  yield takeEvery('add/addUser', addUserSaga);  // Watch for fetchUserStart action
}

export default watchAddUser;

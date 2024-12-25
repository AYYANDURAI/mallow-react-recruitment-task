import { call, Effect, put, takeEvery } from 'redux-saga/effects';
import { fetchUsersSuccess, fetchUsersFailure } from './usersSlice';
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


const getUsers = async(page: any) => {
    const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
    return res;
}

function* fetchUsersSaga(action: any): Generator<Effect, void, ApiResponse> {
  try {
    const { page } = action.payload;
    const user = yield call(getUsers, page);  // API call to fetch user
    yield put(fetchUsersSuccess({data: user.data, status: user.status}));  // Dispatch success action with user data
  } catch (error) {
    const typedError = error as Error;
    yield put(fetchUsersFailure(typedError.message));  // Dispatch failure action
  }
}

function* watchFetchUser() {
  yield takeEvery('users/fetchUsers', fetchUsersSaga);  // Watch for fetchUserStart action
}

export default watchFetchUser;

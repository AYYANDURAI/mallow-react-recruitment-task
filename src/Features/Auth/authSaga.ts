import { call, Effect, put, takeLatest } from "redux-saga/effects";
import { loginSuccess, loginFailure } from "../Auth/authSlice";
import axios from "axios";

interface User {
  email: string;
  password: string;
}

const loginApi = async (email: string, password: string) => {
  const response = await axios.post("https://reqres.in/api/login", {
    email,
    password,
  });
  return response.data;
};

function* handleLogin(action: any): Generator<Effect, void, User> {
  try {
    const { email, password } = action.payload?.values;
    console.log(action.payload)
    const data = yield call(loginApi, email, password);
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginFailure("Invalid credentials or server error"));
  }
}

function* watchLogin() {
  yield takeLatest("auth/loginRequest", handleLogin);
}

export default watchLogin;

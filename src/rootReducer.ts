import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from './Features/Users/usersSlice';
import deleteUser from './Features/DeleteUser/deleteUsersSlice';
import addUser  from './Features/AddUser/addUsersSlice';
import editUser from './Features/EditUser/editUsersSlice';
import auth from './Features/Auth/authSlice'

const rootReducer = combineReducers({
  // Your reducers go here
  users: usersReducer,
  deleteUser: deleteUser,
  addUser: addUser,
  editUser: editUser,
  auth: auth
});

export default rootReducer;

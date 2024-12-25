import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  users: any | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserState = {
  users: null,
  loading: false,
  error: null,
  success: false
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsers(state, action) {
      state.loading = true;
    },
    fetchUsersSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.users = action.payload.data;
      state.success = action.payload.status === 200;
    },
    fetchUsersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { fetchUsers, fetchUsersSuccess, fetchUsersFailure } = userSlice.actions;
export default userSlice.reducer;

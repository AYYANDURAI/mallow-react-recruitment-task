import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddUserState {
  data: any | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AddUserState = {
  data: null,
  loading: false,
  error: null,
  success: false
};

const addUserSlice = createSlice({
  name: 'add',
  initialState,
  reducers: {
    addUser(state, action) {
      state.loading = true;
    },
    addUserSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload.data;
      state.success = action.payload.status === 200;
    },
    addUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { addUser, addUserSuccess, addUserFailure } = addUserSlice.actions;
export default addUserSlice.reducer;

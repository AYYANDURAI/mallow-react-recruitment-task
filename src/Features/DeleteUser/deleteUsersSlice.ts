import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeleteUserState {
  data: any | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: DeleteUserState = {
  data: null,
  loading: false,
  error: null,
  success: false
};

const deleteUserSlice = createSlice({
  name: 'delete',
  initialState,
  reducers: {
    deleteUser(state, action) {
      state.loading = true;
    },
    deleteUserSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload.data;
      state.success = action.payload.status === 200;
    },
    deleteUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { deleteUser, deleteUserSuccess, deleteUserFailure } = deleteUserSlice.actions;
export default deleteUserSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditUserState {
  data: any | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: EditUserState = {
  data: null,
  loading: false,
  error: null,
  success: false
};

const editUserSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    editUser(state, action) {
      state.loading = true;
    },
    editUserSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload.data;
      state.success = action.payload.status === 200;
    },
    editUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { editUser, editUserSuccess, editUserFailure } = editUserSlice.actions;
export default editUserSlice.reducer;

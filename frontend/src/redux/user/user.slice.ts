import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from '@/shared/models';
import { UserThunk } from './user.thunk';

interface UserReduxModel {
  users: {
    loading: boolean;
    data: UserModel[];
    error: null | unknown;
  };
}

const initialValues: UserReduxModel = {
  users: {
    loading: false,
    data: [],
    error: null
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialValues,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(UserThunk.getAllUsers.pending, (state) => {
      state.users.loading = true;
      state.users.error = null;
    });
    builder.addCase(UserThunk.getAllUsers.fulfilled, (state, action) => {
      state.users.loading = false;
      state.users.data = action.payload ?? [];
      state.users.error = null;
    });
    builder.addCase(UserThunk.getAllUsers.rejected, (state, action) => {
      state.users.loading = false;
      state.users.error = action.payload;
    });
  }
});

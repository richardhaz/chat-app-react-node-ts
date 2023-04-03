import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from '@/shared/models';
import { UserThunk } from './user.thunk';

interface UserReduxModel {
  users: {
    loading: boolean;
    data: UserModel[];
    error: null | unknown;
  };
  userById: {
    loading: boolean;
    data: UserModel | null;
    error: null | unknown;
  };
}

const initialState: UserReduxModel = {
  users: {
    loading: false,
    data: [],
    error: null
  },
  userById: {
    loading: false,
    data: null,
    error: null
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // get all users
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

    // get user by id
    builder.addCase(UserThunk.getUserById.pending, (state) => {
      state.userById.loading = true;
      state.userById.error = null;
    });
    builder.addCase(UserThunk.getUserById.fulfilled, (state, action) => {
      state.userById.loading = false;
      state.userById.data = action.payload ?? null;
      state.userById.error = null;
    });
    builder.addCase(UserThunk.getUserById.rejected, (state, action) => {
      state.userById.loading = false;
      state.userById.error = action.payload;
    });
  }
});

import { createSlice } from '@reduxjs/toolkit';
import { LoggedInModel, UserModel } from '@/shared/models';
import { UserThunk } from './user.thunk';

interface UserReduxModel {
  users: {
    loading: boolean;
    data: UserModel[];
    error: null | unknown;
  };
  me: {
    loading: boolean;
    data: UserModel | null;
    error: null | unknown;
  };
  registerUserResult: {
    loading: boolean;
    error: null | unknown;
    data: LoggedInModel | null;
  };
  userById: {
    loading: boolean;
    data: UserModel | null;
    error: null | unknown;
  };
  socketUser: {
    data: UserModel[];
    loading: boolean;
    error: null | unknown;
  };
}

const initialState: UserReduxModel = {
  me: {
    loading: false,
    data: null,
    error: null
  },
  registerUserResult: {
    loading: false,
    data: null,
    error: null
  },
  users: {
    loading: false,
    data: [],
    error: null
  },
  userById: {
    loading: false,
    data: null,
    error: null
  },
  socketUser: {
    loading: false,
    data: [],
    error: null
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // get me
    builder.addCase(UserThunk.getProfile.pending, state => {
      state.me.loading = true;
      state.me.error = null;
    });
    builder.addCase(UserThunk.getProfile.fulfilled, (state, action) => {
      state.me.loading = false;
      state.me.data = action.payload ?? null;
      state.me.error = null;
    });
    builder.addCase(UserThunk.getProfile.rejected, (state, action) => {
      state.me.loading = false;
      state.me.error = action.payload;
    });

    // get all users
    builder.addCase(UserThunk.getAllUsers.pending, state => {
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
    builder.addCase(UserThunk.getUserById.pending, state => {
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

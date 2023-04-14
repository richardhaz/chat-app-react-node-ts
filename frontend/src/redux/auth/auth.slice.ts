import { createSlice } from '@reduxjs/toolkit';
import { LoggedInModel } from '@/shared/models';
import { AuthThunk } from './auth.thunk';
import { LocalStorageService } from '@/shared/services';
import { UserThunk } from '../user/user.thunk';

export interface AuthReduxModel {
  loading: boolean;
  error: null | unknown;
  loggedIn: null | LoggedInModel;
}

const initialValues: AuthReduxModel = {
  loading: false,
  error: null,
  loggedIn: LocalStorageService.getLocalStorage(LocalStorageService.key.loggedIn)
    ? JSON.parse(LocalStorageService.getLocalStorage(LocalStorageService.key.loggedIn) as string)
    : null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialValues,
  reducers: {
    /* 
    logOutUser: (state) => {
      state.loading = false;
      state.error = null;
      state.loggedIn = null;
      LocalStorageService.clearLocalStorage(LocalStorageService.key.loggedIn);
    } */
  },
  extraReducers(builder) {
    // login user
    builder.addCase(AuthThunk.login.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(AuthThunk.login.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedIn = action.payload ?? null;
      state.error = null;
    });
    builder.addCase(AuthThunk.login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // registration user
    builder.addCase(UserThunk.registerUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(UserThunk.registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.loggedIn = action.payload ?? null;
    });
    builder.addCase(UserThunk.registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // logout
    builder.addCase(AuthThunk.logout.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(AuthThunk.logout.fulfilled, state => {
      state.loading = false;
      state.error = null;
      state.loggedIn = null;
    });
    builder.addCase(AuthThunk.logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

/* export const { logOutUser } = authSlice.actions; */

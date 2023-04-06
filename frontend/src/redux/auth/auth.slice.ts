import { createSlice } from '@reduxjs/toolkit';
import { LoggedInModel } from '@/shared/models';
import { AuthThunk } from './auth.thunk';
import { ioSocket } from '@/shared/utils';

export interface AuthReduxModel {
  loading: boolean;
  error: null | unknown;
  token: null | string;
  loggedIn: null | LoggedInModel['loggedIn'];
}

const initialValues: AuthReduxModel = {
  loading: false,
  error: null,
  token: null,
  loggedIn: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialValues,
  reducers: {
    logOutUser: (state) => {
      state.loading = false;
      state.error = null;
      state.token = null;
      state.loggedIn = null;
      if (state.token === null) {
        console.log('window-reload');
        window.location.reload();
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(AuthThunk.login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(AuthThunk.login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload?.token ?? null;
      state.loggedIn = action.payload?.loggedIn ?? null;
      state.error = null;
    });
    builder.addCase(AuthThunk.login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export const { logOutUser } = authSlice.actions;

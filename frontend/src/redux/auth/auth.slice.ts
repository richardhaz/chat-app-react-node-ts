import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '@/shared/models';
import { AuthThunk } from './auth.thunk';

interface AuthReduxModel {
  loading: boolean;
  data: UserModel | null;
  error: null | any;
  token: null | string;
}

const initialValues: AuthReduxModel = {
  loading: false,
  data: null,
  error: null,
  token: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialValues,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(AuthThunk.login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(AuthThunk.login.fulfilled, (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.token = action.payload;
      state.error = null;
    });
    builder.addCase(AuthThunk.login.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    });
  }
});

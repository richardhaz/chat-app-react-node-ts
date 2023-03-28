import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '@/shared/models';

interface AuthReduxModel {
  loading: boolean;
  data: UserModel | null;
  error: null;
  token: null;
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
  reducers: {}
});

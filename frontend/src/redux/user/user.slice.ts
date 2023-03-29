import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from '@/shared/models';

interface UserReduxModel {
  loading: boolean;
  data: UserModel | null;
  error: null;
}

const initialValues: UserReduxModel = {
  loading: false,
  data: null,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialValues,
  reducers: {}
});

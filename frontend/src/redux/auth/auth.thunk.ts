import { AuthService } from '@/shared/services';
import { errorMessageResolver } from '@/shared/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthLoginThunkProps } from './auth.types';
import { toast } from 'react-toastify';

const login = createAsyncThunk(
  'auth/login',
  async ({ values, navigate, reset }: AuthLoginThunkProps, thunkApi) => {
    try {
      const result = await AuthService.login(values);
      if (result.ok) {
        navigate('/');
        reset();
        return result.data;
      }
    } catch (error) {
      const errMessage = errorMessageResolver(error);
      toast.error(errMessage);
      return thunkApi.rejectWithValue(errMessage);
    }
  }
);

export const AuthThunk = { login };

import { AuthService, LocalStorageService } from '@/shared/services';
import { errorMessageResolver, ioSocket } from '@/shared/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthLoginThunkProps } from './auth.types';
import { toast } from 'react-toastify';

const login = createAsyncThunk('auth/login', async ({ values, navigate, reset }: AuthLoginThunkProps, thunkApi) => {
  try {
    const result = await AuthService.login(values);
    if (result.ok) {
      LocalStorageService.setLocalStorage(LocalStorageService.key.loggedIn, result.data);
      navigate('/');
      reset();
      return result.data;
    }
  } catch (error) {
    const errMessage = errorMessageResolver(error);
    toast.error(errMessage);
    return thunkApi.rejectWithValue(errMessage);
  }
});

const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    const result = await AuthService.logout();
    const socket = ioSocket();
    socket.on('disconnect', () => {
      /* console.log('0k'); */
    });
    LocalStorageService.clearLocalStorage(LocalStorageService.key.loggedIn);
    if (result.ok) {
      console.log('logout success');
      location.reload();
    }
  } catch (error) {
    const errMessage = errorMessageResolver(error);
    toast.error(errMessage);
    return thunkApi.rejectWithValue(errMessage);
  }
});

export const AuthThunk = { login, logout };

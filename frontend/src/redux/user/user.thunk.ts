import { CreateUserDto } from '@/shared/dtos/auth';
import { LocalStorageService, UserService } from '@/shared/services';
import { errorMessageResolver } from '@/shared/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { UseFormReset } from 'react-hook-form';

interface RegisterUserProps {
  values: CreateUserDto;
  navigate: NavigateFunction;
  reset: UseFormReset<CreateUserDto>;
}

const registerUser = createAsyncThunk('user/registerUser', async (data: RegisterUserProps, thunkApi) => {
  try {
    if (data.values.avatar) {
      data.values.avatar = data.values.avatar[0];
    }
    const result = await UserService.registerUser(data.values);
    if (result.ok) {
      LocalStorageService.setLocalStorage(LocalStorageService.key.loggedIn, result.data);
      data.navigate('/');
      data.reset();
      return result.data;
    }
  } catch (error) {
    const errMessage = errorMessageResolver(error);
    /* toast.error(errMessage); */
    return thunkApi.rejectWithValue(errMessage);
  }
});

const getAllUsers = createAsyncThunk('user/getAllUsers', async (_, thunkApi) => {
  try {
    const result = await UserService.getAllUsers();
    if (result.ok) {
      return result.data;
    }
  } catch (error) {
    const errMessage = errorMessageResolver(error);
    /* toast.error(errMessage); */
    return thunkApi.rejectWithValue(errMessage);
  }
});

const getProfile = createAsyncThunk('user/getProfile', async (_, thunkApi) => {
  try {
    const result = await UserService.getProfile();
    if (result.ok) {
      return result.data;
    }
  } catch (error) {
    const errMessage = errorMessageResolver(error);
    /* toast.error(errMessage); */
    return thunkApi.rejectWithValue(errMessage);
  }
});

const getUserById = createAsyncThunk('user/getUserById', async (id: string, thunkApi) => {
  try {
    const result = await UserService.getUserById(id);
    if (result.ok) {
      /*  console.log(result.data); */
      return result.data;
    }
  } catch (error) {
    const errMessage = errorMessageResolver(error);
    /* toast.error(errMessage); */
    return thunkApi.rejectWithValue(errMessage);
  }
});

export const UserThunk = { getAllUsers, getUserById, getProfile, registerUser };

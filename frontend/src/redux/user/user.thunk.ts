import { UserService } from '@/shared/services';
import { errorMessageResolver } from '@/shared/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';

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

export const UserThunk = { getAllUsers, getUserById, getProfile };

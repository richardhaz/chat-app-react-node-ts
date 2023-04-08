import { UserService } from '@/shared/services';
import { errorMessageResolver } from '@/shared/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getSocketUserById = createAsyncThunk(
  'socket/getSocketUserById',
  async (id: string, thunkApi) => {
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
  }
);

export const SocketThunk = { getSocketUserById };

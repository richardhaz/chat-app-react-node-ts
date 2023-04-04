import { createSlice } from '@reduxjs/toolkit';
import { LoggedInModel, SocketUserModel } from '@/shared/models';

interface SocketReduxModel {
  onlineUsers: SocketUserModel[];
}

const initialState: SocketReduxModel = {
  onlineUsers: []
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    }
  }
});

export const { setOnlineUsers } = socketSlice.actions;

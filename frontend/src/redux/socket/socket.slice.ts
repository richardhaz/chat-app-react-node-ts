import { createSlice } from '@reduxjs/toolkit';
import { LoggedInModel, SocketUserModel, UserModel } from '@/shared/models';
import { MESSAGE_STATUS } from '@/shared/constants';

interface SocketReduxModel {
  onlineUsers: SocketUserModel[];
  socketMessage: {
    senderId: string;
    message: string;
    messageIdentifier: string;
    messageStatus: MESSAGE_STATUS;
  } | null;
}

const initialState: SocketReduxModel = {
  onlineUsers: [],
  socketMessage: null
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setSocketMessage: (state, action) => {
      state.socketMessage = action.payload;
    }
  }
});

export const { setOnlineUsers, setSocketMessage } = socketSlice.actions;

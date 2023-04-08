import { createSlice } from '@reduxjs/toolkit';
import { SocketMessaggeData, SocketUserModel, UserModel } from '@/shared/models';
import { SocketThunk } from './socket.thunk';

interface SocketReduxModel {
  onlineUsers: SocketUserModel[];
  socketMessages: SocketMessaggeData | null;
  socketUserById: {
    data: UserModel | null;
    loading: boolean;
    error: null | unknown;
  };
}

const initialState: SocketReduxModel = {
  onlineUsers: [],
  socketMessages: null,
  socketUserById: {
    data: null,
    loading: false,
    error: null
  }
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setSocketMessages: (state, action) => {
      state.socketMessages = action.payload;
    }
  },
  extraReducers(builder) {
    // get socket user by id
    builder.addCase(SocketThunk.getSocketUserById.pending, (state) => {
      state.socketUserById.loading = true;
      state.socketUserById.error = null;
    });
    builder.addCase(SocketThunk.getSocketUserById.fulfilled, (state, action) => {
      state.socketUserById.loading = false;
      state.socketUserById.data = action.payload ?? null;
      state.socketUserById.error = null;
    });
    builder.addCase(SocketThunk.getSocketUserById.rejected, (state, action) => {
      state.socketUserById.loading = false;
      state.socketUserById.error = action.payload;
    });
  }
});

export const { setOnlineUsers, setSocketMessages } = socketSlice.actions;

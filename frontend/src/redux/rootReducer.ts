import { combineReducers } from '@reduxjs/toolkit';
import { appSlice } from './app/app.slice';
import { authSlice } from './auth/auth.slice';
import { userSlice } from './user/user.slice';
import { messageSlice } from './message/message.slice';
import { socketSlice } from './socket/socket.slice';
import { conversationSlice } from './conversation/conversation.slice';

export const rootReducer = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  message: messageSlice.reducer,
  socket: socketSlice.reducer,
  conversation: conversationSlice.reducer
});

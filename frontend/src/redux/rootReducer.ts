import { combineReducers } from '@reduxjs/toolkit';
import { appSlice } from './app/app.slice';
import { authSlice } from './auth/auth.slice';
import { userSlice } from './user/user.slice';
import { messageSlice } from './message/message.slice';

export const rootReducer = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  message: messageSlice.reducer
});

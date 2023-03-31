import { combineReducers } from '@reduxjs/toolkit';
import { appSlice } from './app/app.slice';
import { authSlice } from './auth/auth.slice';
import { userSlice } from './user/user.slice';

export const rootReducer = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer
});

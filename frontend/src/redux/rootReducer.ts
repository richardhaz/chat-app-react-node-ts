import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice';
import { userSlice } from './user/user.slice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer
});

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppReduxModel {
  chatListNavigationDrawer: boolean;
  usersListNavigationDrawer: boolean;
}

const initialValues: AppReduxModel = {
  chatListNavigationDrawer: false,
  usersListNavigationDrawer: false
};

export const appSlice = createSlice({
  name: 'navigationDrawer',
  initialState: initialValues,
  reducers: {
    setUsersListNavigationDrawer: (state, action: PayloadAction<boolean>) => {
      console.log(action.payload);
      state.usersListNavigationDrawer = action.payload;
    },
    setChatListNavigationDrawer: (state, action: PayloadAction<boolean>) => {
      console.log(action.payload);
      state.chatListNavigationDrawer = action.payload;
    }
  }
});

export const { setChatListNavigationDrawer, setUsersListNavigationDrawer } = appSlice.actions;

import { createSlice } from '@reduxjs/toolkit';

interface AppReduxModel {
  navigationDrawerState: boolean;
}

const initialValues: AppReduxModel = {
  navigationDrawerState: false
};

export const appSlice = createSlice({
  name: 'navigationDrawer',
  initialState: initialValues,
  reducers: {
    toggleNavigationDrawer: (state) => {
      state.navigationDrawerState = !state.navigationDrawerState;
    },
    showNavigationDrawer: (state) => {
      state.navigationDrawerState = true;
    },
    hideNavigationDrawer: (state) => {
      state.navigationDrawerState = false;
    }
  }
});

export const { toggleNavigationDrawer, showNavigationDrawer, hideNavigationDrawer } =
  appSlice.actions;

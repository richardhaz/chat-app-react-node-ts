import { createSlice } from '@reduxjs/toolkit';
import { GlobalMessageModel, GlobalMessageResultModel } from '@/shared/models';
import { GlobalMessageThunk } from './global-message.thunk';

interface MessageReduxModel {
  globalMessages: {
    data: GlobalMessageResultModel[];
    loading: boolean;
    error: null | unknown;
  };
  createGlobalMessage: {
    data: GlobalMessageModel | null;
    loading: boolean;
    error: null | unknown;
  };
}

const initialState: MessageReduxModel = {
  globalMessages: {
    data: [],
    loading: false,
    error: null
  },
  createGlobalMessage: {
    data: null,
    error: null,
    loading: false
  }
};

export const globalMessageSlice = createSlice({
  name: 'global-message',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // get all global messages
    builder.addCase(GlobalMessageThunk.getAllMessages.pending, (state) => {
      state.globalMessages.loading = true;
      state.globalMessages.error = null;
    });
    builder.addCase(GlobalMessageThunk.getAllMessages.fulfilled, (state, action) => {
      state.globalMessages.loading = false;
      state.globalMessages.data = action.payload ?? [];
      state.globalMessages.error = null;
    });
    builder.addCase(GlobalMessageThunk.getAllMessages.rejected, (state, action) => {
      state.globalMessages.loading = false;
      state.globalMessages.error = action.payload;
    });

    // create a global message
    builder.addCase(GlobalMessageThunk.createMessage.pending, (state) => {
      state.createGlobalMessage.loading = true;
      state.createGlobalMessage.error = null;
    });
    builder.addCase(GlobalMessageThunk.createMessage.fulfilled, (state, action) => {
      state.createGlobalMessage.loading = false;
      state.createGlobalMessage.data = action.payload ?? null;
      state.createGlobalMessage.error = null;
    });
    builder.addCase(GlobalMessageThunk.createMessage.rejected, (state, action) => {
      state.createGlobalMessage.loading = false;
      state.createGlobalMessage.error = action.payload;
    });
  }
});

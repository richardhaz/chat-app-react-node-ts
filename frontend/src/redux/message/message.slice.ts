import { createSlice } from '@reduxjs/toolkit';
import { MessageThunk } from './message.thunk';
import { MessageModel, MessageResultModel } from '@/shared/models';

interface MessageReduxModel {
  messages: {
    data: MessageResultModel[];
    loading: boolean;
    error: null | unknown;
  };
  createMessage: {
    data: MessageModel | null;
    loading: boolean;
    error: null | unknown;
  };
}

const initialState: MessageReduxModel = {
  messages: {
    data: [],
    loading: false,
    error: null
  },
  createMessage: {
    data: null,
    error: null,
    loading: false
  }
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // get all messages
    builder.addCase(MessageThunk.getAllMessages.pending, (state) => {
      state.messages.loading = true;
      state.messages.error = null;
    });
    builder.addCase(MessageThunk.getAllMessages.fulfilled, (state, action) => {
      state.messages.loading = false;
      state.messages.data = action.payload ?? [];
      state.messages.error = null;
    });
    builder.addCase(MessageThunk.getAllMessages.rejected, (state, action) => {
      state.messages.loading = false;
      state.messages.error = action.payload;
    });

    // create message
    builder.addCase(MessageThunk.createMessage.pending, (state) => {
      state.createMessage.loading = true;
      state.createMessage.error = null;
    });
    builder.addCase(MessageThunk.createMessage.fulfilled, (state, action) => {
      state.createMessage.loading = false;
      state.createMessage.data = action.payload ?? null;
      state.createMessage.error = null;
    });
    builder.addCase(MessageThunk.createMessage.rejected, (state, action) => {
      state.createMessage.loading = false;
      state.createMessage.error = action.payload;
    });
  }
});

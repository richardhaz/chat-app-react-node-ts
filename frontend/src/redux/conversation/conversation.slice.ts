import { ConversationModel } from '@/shared/models';
import { createSlice } from '@reduxjs/toolkit';
import { ConversationThunk } from './conversation.thunk';

interface ConversationReduxModel {
  conversationByMembers: {
    data: ConversationModel[];
    loading: boolean;
    error: null | unknown;
  };
  conversationById: {
    data: ConversationModel | null;
    loading: boolean;
    error: null | unknown;
  };
  allMyConversations: {
    data: ConversationModel[];
    loading: boolean;
    error: null | unknown;
  };
  createConversation: {
    data: ConversationModel | null;
    loading: boolean;
    error: null | unknown;
  };
  updateLastConversationMessageStatus: {
    data: ConversationModel | null;
    loading: boolean;
    error: null | unknown;
  };
}

const initialState: ConversationReduxModel = {
  conversationByMembers: {
    data: [],
    loading: false,
    error: null
  },
  conversationById: {
    data: null,
    loading: false,
    error: null
  },
  allMyConversations: {
    data: [],
    loading: false,
    error: null
  },
  createConversation: {
    data: null,
    loading: false,
    error: null
  },
  updateLastConversationMessageStatus: {
    data: null,
    loading: false,
    error: null
  }
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // get conversation by members
    builder.addCase(ConversationThunk.getConversationByMembers.pending, state => {
      state.conversationByMembers.loading = true;
      state.conversationByMembers.error = null;
    });
    builder.addCase(ConversationThunk.getConversationByMembers.fulfilled, (state, action) => {
      state.conversationByMembers.loading = false;
      state.conversationByMembers.data = action.payload ?? [];
      state.conversationByMembers.error = null;
    });
    builder.addCase(ConversationThunk.getConversationByMembers.rejected, (state, action) => {
      state.conversationByMembers.loading = false;
      state.conversationByMembers.error = action.payload;
    });

    // get all my conversations
    builder.addCase(ConversationThunk.getAllMyConversations.pending, state => {
      state.allMyConversations.loading = true;
      state.allMyConversations.error = null;
    });
    builder.addCase(ConversationThunk.getAllMyConversations.fulfilled, (state, action) => {
      state.allMyConversations.loading = false;
      state.allMyConversations.data = action.payload ?? [];
      state.allMyConversations.error = null;
    });
    builder.addCase(ConversationThunk.getAllMyConversations.rejected, (state, action) => {
      state.allMyConversations.loading = false;
      state.allMyConversations.error = action.payload;
    });

    // create conversation
    builder.addCase(ConversationThunk.createConversation.pending, state => {
      state.createConversation.loading = true;
      state.createConversation.error = null;
    });
    builder.addCase(ConversationThunk.createConversation.fulfilled, (state, action) => {
      state.createConversation.loading = false;
      state.createConversation.data = action.payload ?? null;
      state.createConversation.error = null;
    });
    builder.addCase(ConversationThunk.createConversation.rejected, (state, action) => {
      state.createConversation.loading = false;
      state.createConversation.error = action.payload;
    });

    // update last conversation message status
    builder.addCase(ConversationThunk.updateLastMessageStatus.pending, state => {
      state.updateLastConversationMessageStatus.loading = true;
      state.updateLastConversationMessageStatus.error = null;
    });
    builder.addCase(ConversationThunk.updateLastMessageStatus.fulfilled, (state, action) => {
      state.updateLastConversationMessageStatus.loading = false;
      state.updateLastConversationMessageStatus.data = action.payload ?? null;
      state.updateLastConversationMessageStatus.error = null;
    });
    builder.addCase(ConversationThunk.updateLastMessageStatus.rejected, (state, action) => {
      state.updateLastConversationMessageStatus.loading = false;
      state.updateLastConversationMessageStatus.error = action.payload;
    });

    // get conversation by id
    builder.addCase(ConversationThunk.getConversationById.pending, state => {
      state.conversationById.loading = true;
      state.conversationById.error = null;
    });
    builder.addCase(ConversationThunk.getConversationById.fulfilled, (state, action) => {
      state.conversationById.loading = false;
      state.conversationById.data = action.payload ?? null;
      state.conversationById.error = null;
    });
    builder.addCase(ConversationThunk.getConversationById.rejected, (state, action) => {
      state.conversationById.loading = false;
      state.conversationById.error = action.payload;
    });
  }
});

import {
  CreateConversationDto,
  FindAllMyConversationsDto,
  FindConversationDto
} from '@/shared/dtos/conversations';
import { ConversationService } from '@/shared/services/conversation.service';
import { errorMessageResolver } from '@/shared/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getConversationByMembers = createAsyncThunk(
  'conversation/getConversationByMembers',
  async (data: FindConversationDto, thunkApi) => {
    try {
      const result = await ConversationService.getConversationByMembers(data);
      if (result.ok) {
        return result.data;
      }
    } catch (error) {
      const errMessage = errorMessageResolver(error);
      /* toast.error(errMessage); */
      return thunkApi.rejectWithValue(errMessage);
    }
  }
);

const getAllMyConversations = createAsyncThunk(
  'conversation/getAllMyConversations',
  async (data: FindAllMyConversationsDto, thunkApi) => {
    try {
      const result = await ConversationService.getAllMyConversations(data);
      if (result.ok) {
        return result.data;
      }
    } catch (error) {
      const errMessage = errorMessageResolver(error);
      /* toast.error(errMessage); */
      return thunkApi.rejectWithValue(errMessage);
    }
  }
);

const createConversation = createAsyncThunk(
  'conversation/createConversation',
  async (data: CreateConversationDto, thunkApi) => {
    try {
      const result = await ConversationService.createConversation(data);
      if (result.ok) {
        return result.data;
      }
    } catch (error) {
      const errMessage = errorMessageResolver(error);
      /* toast.error(errMessage); */
      return thunkApi.rejectWithValue(errMessage);
    }
  }
);

export const ConversationThunk = {
  getConversationByMembers,
  createConversation,
  getAllMyConversations
};

import { GlobalMessageService, LocalStorageService } from '@/shared/services';
import { errorMessageResolver, ioSocket } from '@/shared/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateGlobalMessageDto, GetGlobalMessagesDto } from '@/shared/dtos/global-messages';
import { EVENTS } from '@/sockets';

const getAllMessages = createAsyncThunk(
  'global-message/getAllMessages',
  async (data: GetGlobalMessagesDto, thunkApi) => {
    try {
      const result = await GlobalMessageService.getAllMessages(data);
      if (result.ok) {
        /*       console.log('get-all-messages', result.data); */
        return result.data;
      }
    } catch (error) {
      const errMessage = errorMessageResolver(error);
      /* toast.error(errMessage); */
      return thunkApi.rejectWithValue(errMessage);
    }
  }
);

const createMessage = createAsyncThunk(
  'global-message/createMessage',
  async (data: CreateGlobalMessageDto, thunkApi) => {
    try {
      // sending messages
      const socket = ioSocket();
      socket.emit(EVENTS.SEND_GLOBAL_MESSAGE, {
        senderId: data.from,
        senderDetails: LocalStorageService.getLocalStorage(LocalStorageService.key.loggedIn)
          ? JSON.parse(LocalStorageService.getLocalStorage(LocalStorageService.key.loggedIn) as string)
          : null,
        message: data.message,
        messageIdentifier: data.messageIdentifier
      });

      const result = await GlobalMessageService.createMessage(data);
      if (result.ok) {
        /*       console.log('create-message', result.data); */

        return result.data;
      }
    } catch (error) {
      const errMessage = errorMessageResolver(error);
      /* toast.error(errMessage); */
      return thunkApi.rejectWithValue(errMessage);
    }
  }
);

export const GlobalMessageThunk = { getAllMessages, createMessage };

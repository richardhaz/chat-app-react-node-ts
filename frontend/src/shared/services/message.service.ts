import { AxiosUrl } from '@/config/axios-config';
import { GenericResponse, MessageModel, MessageResultModel } from '@/shared/models';
import { CreateMessageDto, GetAllMessagesDto } from '../dtos/messages';

const getAllMessages = (data: GetAllMessagesDto): Promise<GenericResponse<MessageResultModel[]>> => {
  return AxiosUrl.post('/message/all', data).then((res) => {
    return res.data;
  });
};

const createMessage = (data: CreateMessageDto): Promise<GenericResponse<MessageModel>> => {
  return AxiosUrl.post('/message/create', data).then((res) => {
    return res.data;
  });
};

export const MessageService = { getAllMessages, createMessage };

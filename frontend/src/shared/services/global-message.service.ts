import { AxiosUrl } from '@/config/axios-config';
import { GenericResponse, GlobalMessageModel, GlobalMessageResultModel } from '@/shared/models';
import { CreateGlobalMessageDto, GetGlobalMessagesDto } from '../dtos/global-messages';

const getAllMessages = (data: GetGlobalMessagesDto): Promise<GenericResponse<GlobalMessageResultModel[]>> => {
  return AxiosUrl.post('/global-message/all', data).then((res) => {
    return res.data;
  });
};

const createMessage = (data: CreateGlobalMessageDto): Promise<GenericResponse<GlobalMessageModel>> => {
  return AxiosUrl.post('/global-message/create', data).then((res) => {
    return res.data;
  });
};

export const GlobalMessageService = { getAllMessages, createMessage };

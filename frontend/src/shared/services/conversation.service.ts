import { AxiosUrl } from '@/config/axios-config';
import { ConversationModel, GenericResponse } from '@/shared/models';
import {
  CreateConversationDto,
  FindAllMyConversationsDto,
  FindConversationDto
} from '../dtos/conversations';

const getConversationByMembers = (
  data: FindConversationDto
): Promise<GenericResponse<ConversationModel[]>> => {
  return AxiosUrl.post('/conversation/find-by-members', data).then((res) => {
    return res.data;
  });
};

const getAllMyConversations = (
  data: FindAllMyConversationsDto
): Promise<GenericResponse<ConversationModel[]>> => {
  return AxiosUrl.post('/conversation/find-all-my-conversations', data).then((res) => {
    return res.data;
  });
};

const createConversation = (
  data: CreateConversationDto
): Promise<GenericResponse<ConversationModel>> => {
  return AxiosUrl.post('/conversation/create', data).then((res) => {
    return res.data;
  });
};

export const ConversationService = {
  getConversationByMembers,
  createConversation,
  getAllMyConversations
};

import { AxiosUrl } from '@/config/axios-config';
import { ConversationModel, GenericResponse, UpdateLastMessageStatusDto } from '@/shared/models';
import {
  CreateConversationDto,
  FindAllMyConversationsDto,
  FindConversationDto,
  GetConversationByIdDto
} from '../dtos/conversations';

const getConversationByMembers = (data: FindConversationDto): Promise<GenericResponse<ConversationModel[]>> => {
  return AxiosUrl.post('/conversation/find-by-members', data).then(res => {
    return res.data;
  });
};

const getAllMyConversations = (data: FindAllMyConversationsDto): Promise<GenericResponse<ConversationModel[]>> => {
  return AxiosUrl.post('/conversation/all-my-conversations', data).then(res => {
    return res.data;
  });
};

const createConversation = (data: CreateConversationDto): Promise<GenericResponse<ConversationModel>> => {
  return AxiosUrl.post('/conversation/create', data).then(res => {
    return res.data;
  });
};

const updateLastMessageStatus = (data: UpdateLastMessageStatusDto): Promise<GenericResponse<ConversationModel>> => {
  return AxiosUrl.patch('/conversation/update-last-message-status', data).then(res => {
    return res.data;
  });
};

const getConversationById = (data: GetConversationByIdDto): Promise<GenericResponse<ConversationModel>> => {
  return AxiosUrl.post('/conversation/get-conversation-by-id', data).then(res => {
    return res.data;
  });
};

export const ConversationService = {
  getConversationByMembers,
  createConversation,
  getAllMyConversations,
  updateLastMessageStatus,
  getConversationById
};

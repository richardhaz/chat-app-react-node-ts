import { ConversationModel } from '@/models';

import { ConversationSchema } from './conversation.schema';
import {
  CreateConversationDto,
  FindAllMyConversationsDto,
  FindConversationDto,
  GetConversationByIdDto,
  UpdateConversationDto,
  UpdateLastMessageStatusDto,
} from './dtos';

const create = (dto: CreateConversationDto) => {
  const payload = {
    members: [dto.member1, dto.member2],
    lastMessage: dto.lastMessage,
    senderId: dto.senderId,
  };
  return ConversationSchema.create(payload);
};

const getConversationById = (dto: GetConversationByIdDto) => {
  return ConversationSchema.findById(dto.conversationId);
};

const update = (dto: UpdateConversationDto) => {
  const filter = { _id: dto.conversationId };
  const update = { lastMessage: dto.lastMessage, senderId: dto.senderId };
  return ConversationSchema.findOneAndUpdate(filter, update);
};

const updateLastMessageStatus = (dto: UpdateLastMessageStatusDto, foundConversation: ConversationModel[]) => {
  const filter = { _id: foundConversation[0]._id };
  const update = { messageStatus: dto.messageStatus };
  return ConversationSchema.findOneAndUpdate(filter, update);
};

const findConversationByMembers = (dto: FindConversationDto) => {
  return ConversationSchema.find({
    members: {
      $all: [dto.member1, dto.member2],
    },
  }).sort({ updatedAt: 'asc' });
};

const findAllMyConversations = (dto: FindAllMyConversationsDto) => {
  return ConversationSchema.find({
    members: {
      $all: [dto.senderId],
    },
  }).sort({ updatedAt: 'desc' });
};

export const ConversationService = {
  create,
  findConversationByMembers,
  update,
  findAllMyConversations,
  updateLastMessageStatus,
  getConversationById,
};

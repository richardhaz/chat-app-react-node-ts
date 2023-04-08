import { ConversationModel } from '@/models';

import { ConversationSchema } from './conversation.schema';
import { CreateConversationDto, FindAllMyConversationsDto, FindConversationDto, UpdateConversationDto } from './dtos';

const create = (dto: CreateConversationDto) => {
  const payload: ConversationModel = {
    members: [dto.member1, dto.member2],
    lastMessage: dto.lastMessage,
    senderId: dto.senderId,
  };
  return ConversationSchema.create(payload);
};

const update = (dto: UpdateConversationDto) => {
  const filter = { _id: dto.conversationId };
  const update = { lastMessage: dto.lastMessage, senderId: dto.senderId };
  return ConversationSchema.findOneAndUpdate(filter, update);
};

const findConversation = (dto: FindConversationDto) => {
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

export const ConversationService = { create, findConversation, update, findAllMyConversations };

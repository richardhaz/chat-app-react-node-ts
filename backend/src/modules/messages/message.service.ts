import { CreateMessageDto, GetChatMessageDto } from './dtos';
import { MessageSchema } from './message.schema';

const createMessage = (dto: CreateMessageDto) => {
  return MessageSchema.create({
    message: { text: dto.message },
    users: [dto.from, dto.to],
    sender: dto.from,
  });
};

const getAllMessages = (dto: GetChatMessageDto) => {
  return MessageSchema.find({
    users: {
      $all: [dto.from, dto.to],
    },
  }).sort({ updatedAt: 'desc' });
};

const getLastestMessage = (dto: GetChatMessageDto) => {
  return MessageSchema.find({
    users: {
      $in: [dto.from],
    },
  }); /* .sort({ $natural: -1 }); */
  /*     .limit(1); */
};

export const MessageService = { createMessage, getAllMessages, getLastestMessage };

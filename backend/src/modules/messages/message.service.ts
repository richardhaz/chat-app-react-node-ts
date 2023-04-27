import { CreateMessageDto, GetChatMessageDto } from './dtos';
import { MessageSchema } from './message.schema';

const createMessage = (dto: CreateMessageDto) => {
  return MessageSchema.create({
    message: { text: dto.message },
    users: [dto.from, dto.to],
    sender: dto.from,
    messageIdentifier: dto.messageIdentifier,
  });
};

const getAllMessages = (dto: GetChatMessageDto) => {
  return MessageSchema.find({
    users: {
      $all: [dto.from, dto.to],
    },
  })
    .sort({ updatedAt: 'asc' })
    .lean();
};

const getLastestMessage = (dto: GetChatMessageDto) => {
  return MessageSchema.find({
    users: {
      $in: [dto.from],
    },
  }).lean(); /* .sort({ $natural: -1 }); */
  /*     .limit(1); */
};

export const MessageService = { createMessage, getAllMessages, getLastestMessage };

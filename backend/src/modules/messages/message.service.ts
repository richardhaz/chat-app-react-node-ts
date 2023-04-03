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

export const MessageService = { createMessage, getAllMessages };

import { CreateGlobalMessageDto } from './dtos';
import { GlobalMessageSchema } from './global-messages.schema';

const getAllMessages = () => {
  return GlobalMessageSchema.find({});
};

const createMessage = (dto: CreateGlobalMessageDto) => {
  return GlobalMessageSchema.create({
    message: { text: dto.message },
    sender: dto.from,
    messageIdentifier: dto.messageIdentifier,
  });
};

export const GlobalMessageService = { getAllMessages, createMessage };

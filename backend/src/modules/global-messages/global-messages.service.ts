import { UserSchema } from '../users/user.schema';
import { CreateGlobalMessageDto } from './dtos';
import { GlobalMessageSchema } from './global-messages.schema';

const getAllMessages = () => {
  return GlobalMessageSchema.find({});
};

const getUserSocketDetail = async (id: string) => {
  const result = await UserSchema.findById(id)
    .select({ email: 1, username: 1, avatar: 1, firstName: 1, lastName: 1 })
    .lean();
  return { ...result, displayName: `${result?.firstName} ${result?.lastName}` };
};

const createMessage = (dto: CreateGlobalMessageDto) => {
  return GlobalMessageSchema.create({
    message: { text: dto.message },
    sender: dto.from,
    messageIdentifier: dto.messageIdentifier,
  });
};

export const GlobalMessageService = { getAllMessages, createMessage, getUserSocketDetail };

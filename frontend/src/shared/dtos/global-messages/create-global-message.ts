import { CreateMessageDto } from '../messages';

export type CreateGlobalMessageDto = Omit<CreateMessageDto, 'to'>;

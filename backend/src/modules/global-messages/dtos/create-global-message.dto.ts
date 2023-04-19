import { CreateMessageDto } from '@modules/messages/dtos';

export interface CreateGlobalMessageDto extends Omit<CreateMessageDto, 'to'> {}

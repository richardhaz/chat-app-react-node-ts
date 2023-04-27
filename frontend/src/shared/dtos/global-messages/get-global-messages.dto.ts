import { CreateGlobalMessageDto } from './create-global-message';

export type GetGlobalMessagesDto = Pick<CreateGlobalMessageDto, 'from'>;

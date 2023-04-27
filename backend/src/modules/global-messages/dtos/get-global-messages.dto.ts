import { CreateGlobalMessageDto } from './create-global-message.dto';

export interface GetGlobalMessagesDto extends Pick<CreateGlobalMessageDto, 'from'> {}

import { ConversationModel } from '@models/conversation.model';

export interface UpdateLastMessageStatusDto {
  member1: string;
  member2: string;
  messageStatus: ConversationModel['messageStatus'];
}

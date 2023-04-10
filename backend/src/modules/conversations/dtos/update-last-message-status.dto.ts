import { ConversationModel } from '@/models';

export interface UpdateLastMessageStatusDto {
  member1: string;
  member2: string;
  messageStatus: ConversationModel['messageStatus'];
}

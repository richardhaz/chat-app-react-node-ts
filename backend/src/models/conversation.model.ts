export interface ConversationModel {
  _id?: string;
  members: string[];
  lastMessage: string;
  messageStatus: 'delivered' | 'seen' | 'deleted';
  senderId: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

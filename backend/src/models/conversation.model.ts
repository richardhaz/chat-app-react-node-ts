export interface ConversationModel {
  _id?: string;
  lastMessage: string;
  members: string[];
  senderId: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

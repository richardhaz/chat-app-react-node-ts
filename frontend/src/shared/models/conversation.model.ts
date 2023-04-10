import { UserModel } from './user-model';

export type ConversationModel = {
  _id: string;
  lastMessage: string;
  senderId: string;
  contact: UserModel;
  members: string[];
  messageStatus: 'delivered' | 'seen' | 'deleted';
  createdAt: Date;
  updatedAt: Date;
};

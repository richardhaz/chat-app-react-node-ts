import { UserModel } from './user-model';

export type ConversationModel = {
  _id: string;
  lastMessage: string;
  senderId: string;
  contact: UserModel;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
};

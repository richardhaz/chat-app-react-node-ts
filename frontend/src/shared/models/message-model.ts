import { UserModel } from './user-model';

export interface MessageModel {
  _id: string;
  message: string;
  createdAt: string;
  startDate: string;
  users: UserModel[];
  sentBy: [string];
}

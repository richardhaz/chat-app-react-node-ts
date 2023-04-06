import { ObjectId } from 'mongoose';

import { MESSAGE_STATUS } from '@/constants';

import { UserModel } from './user.model';

export interface MessageModel {
  _id: string;
  messageIdentifier: string;
  message: {
    text: string;
    status: MESSAGE_STATUS;
  };
  users: UserModel[];
  sender: ObjectId;
  createdAt: string;
  updatedAt: string;
}

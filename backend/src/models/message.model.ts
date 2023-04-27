import { ObjectId } from 'mongoose';

import { MESSAGE_STATUS } from '@constants/message.constant';

export interface MessageModel {
  _id: string;
  messageIdentifier: string;
  message: {
    text: string;
    status: MESSAGE_STATUS;
  };
  users: string[];
  sender: ObjectId;
  createdAt: string;
  updatedAt: string;
}

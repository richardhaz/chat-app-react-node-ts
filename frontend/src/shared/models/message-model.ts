import { MESSAGE_STATUS } from '../constants';
import { UserModel } from './user-model';

export interface MessageModel {
  _id: string;
  messageIdentifier: string;
  message: {
    text: string;
    status: MESSAGE_STATUS;
  };
  createdAt: string;
  updatedAt: string;
  users: UserModel[];
  sender: string;
}

export interface MessageResultModel {
  _id?: string;
  fromSelf: boolean;
  messageIdentifier: string;
  senderDetails: UserModel;
  message: string;
  status: MESSAGE_STATUS;
  createdAt: string | Date;
  updatedAt: string | Date;
}

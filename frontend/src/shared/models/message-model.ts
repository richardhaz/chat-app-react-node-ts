import { MESSAGE_STATUS } from '../constants';
import { UserModel } from './user-model';

export interface MessageModel {
  _id: string;
  message: {
    text: string;
  };
  createdAt: string;
  startDate: string;
  users: UserModel[];
  sender: [string];
}

export interface MessageResultModel {
  _id: string;
  fromSelf: boolean;
  userDetails: UserModel;
  message: string;
  status: MESSAGE_STATUS;
  createdAt: string;
  updatedAt: string;
}

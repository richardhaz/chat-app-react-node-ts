import { MESSAGE_STATUS } from '../constants';
import { LoggedInModel } from './logged-in.model';
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
  message: string;
  senderId: string;
  status: MESSAGE_STATUS;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface SocketMessaggeData {
  senderId: string;
  receiverId: string;
  senderDetails: LoggedInModel;
  message: string;
  messageIdentifier: string;
  messageStatus: MESSAGE_STATUS.DELIVERED;
  /*   conversationId: string; */
}

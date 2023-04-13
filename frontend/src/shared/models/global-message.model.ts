import { MESSAGE_STATUS } from '../constants';
import { LoggedInModel } from './logged-in.model';

export interface GlobalMessageModel {
  _id: string;
  messageIdentifier: string;
  message: {
    text: string;
    status: MESSAGE_STATUS;
  };
  sender: string;
  createdAt: string;
  updatedAt: string;
}

export interface SocketGlobalMessaggeData {
  senderId: string;
  senderDetails: LoggedInModel;
  fromSelf: boolean;
  message: string;
  messageIdentifier: 'delivered' | 'seen';
  messageStatus: MESSAGE_STATUS.DELIVERED;
  createdAt: string | Date;
  updatedAt: string | Date;
  /*   conversationId: string; */
}

/* 


export interface GlobalMessageResultModel {
  _id: string;
  messageIdentifier: 'delivered' | 'seen';
  message: string;
  messageStatus: string;
  sender: UserModel;
  createdAt: string | Date;
  updatedAt: string | Date;
}


*/

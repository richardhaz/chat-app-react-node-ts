import { LoggedInModel } from './logged-in.model';

export interface GlobalMessageResultModel {
  _id?: string;
  messageIdentifier: 'delivered' | 'seen';
  message: string;
  fromSelf: boolean;
  messageStatus: string;
  sender: LoggedInModel;
  createdAt: string | Date;
  updatedAt: string | Date;
}

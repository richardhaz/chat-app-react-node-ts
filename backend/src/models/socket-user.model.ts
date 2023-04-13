import { LoggedInModel } from './user.model';

export interface SocketUserModel extends LoggedInModel {
  connectionStatus: 'online' | 'offline' | 'iddle';
}

export interface SocketUserResult {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

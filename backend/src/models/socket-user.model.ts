import { LoggedInModel } from './user.model';

export interface SocketUserModel extends LoggedInModel {
  connectionStatus: 'online' | 'offline' | 'iddle';
}

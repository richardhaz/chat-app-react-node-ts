import { LoggedInModel } from './logged-in.model';

export interface SocketUserModel {
  profile: LoggedInModel;
  socketId: string;
}

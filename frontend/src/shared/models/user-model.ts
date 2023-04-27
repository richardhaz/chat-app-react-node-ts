import { USER_STATUS } from '../constants';

export interface UserModel {
  _id: string;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  status: USER_STATUS;
  isPremium: boolean;
  isAdmin: boolean;
}

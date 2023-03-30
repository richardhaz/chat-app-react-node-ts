import { LOGIN_METHOD, ROLES, USER_STATUS, USER_TYPE } from '@common/constants';
import { Date, ObjectId } from 'mongoose';
import { PhoneModel } from './phone.model';
import { CustomerAddressModel, UserAddressModel } from './user-address.model';

export interface UserModel {
	email: string;
	password: string;
	username: string;
	firstName: string;
	lastName: string;
	avatar: string;
	status: USER_STATUS;
	messages: string[];
}

import { model, Schema } from 'mongoose';

import { USER_STATUS } from '@constants/index';
import { UserModel } from '@models/index';

const User = new Schema<UserModel>(
  {
    email: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
      required: true,
      type: String,
    },
    isPremium: {
      required: true,
      type: Boolean,
      default: false,
    },
    isAdmin: {
      required: true,
      type: Boolean,
      default: false,
    },
    username: {
      required: true,
      type: String,
    },
    avatar: {
      required: false,
      type: Schema.Types.Mixed,
    },
    status: {
      required: true,
      type: String,
      enum: [USER_STATUS.ACTIVE, USER_STATUS.DISABLED, USER_STATUS.RESTRICTED],
      default: USER_STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UserSchema = model('users', User);

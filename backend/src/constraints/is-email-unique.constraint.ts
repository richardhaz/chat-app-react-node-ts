import { CustomValidator } from 'express-validator';

import { UserSchema } from '@/modules/users/user.schema';

export const IsEmailUnique: CustomValidator = (value) => {
  return UserSchema.findOne({ email: value }).then((user) => {
    if (user) {
      return Promise.reject('E-mail already in use');
    }
  });
};

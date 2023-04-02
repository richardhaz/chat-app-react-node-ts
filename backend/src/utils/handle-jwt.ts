import jwt from 'jsonwebtoken';

import { envConfig } from '@/config/env-config';
import { JwtPayloadExtendedModel, UserModel } from '@/models';

const secretKey = envConfig().jwt.secret as string;
const expiresIn = envConfig().jwt.expiration as string;

export const signToken = async (user: UserModel): Promise<string> => {
  const payload: JwtPayloadExtendedModel = {
    context: {
      user: {
        _id: String(user._id),
        isPremium: user.isPremium,
        isAdmin: user.isAdmin,
      },
    },
  };
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyToken = async (token: string): Promise<JwtPayloadExtendedModel> => {
  return jwt.verify(token, secretKey) as JwtPayloadExtendedModel;
};

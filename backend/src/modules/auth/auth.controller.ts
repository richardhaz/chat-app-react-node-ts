import { Request, Response } from 'express';

import { UserModel } from '@/models';
import { ErrorManager, signToken, verifyPwd } from '@/utils';

import { UserService } from '../users/user.service';
import { LoginUserDto } from './dtos';

const login = async (req: Request, res: Response) => {
  try {
    const dto = req.body as LoginUserDto;

    const user = (await UserService.findByEmail(dto.email)) as UserModel;

    if (!user) return res.status(401).json({ message: 'INCORRECT_EMAIL_OR_PASSWORD' });

    const validPassword = await verifyPwd(dto.password, user.password);

    console.log({ validPassword });

    if (!validPassword) return res.status(401).json({ message: 'INCORRECT_EMAIL_OR_PASSWORD' });

    const token = await signToken(user);

    res.status(200).json({
      ok: true,
      data: {
        token,
        loggedIn: {
          _id: user._id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
          isPremium: user.isPremium,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    return ErrorManager(res, error, 'ERROR_LOGIN');
  }
};

export const AuthController = { login };

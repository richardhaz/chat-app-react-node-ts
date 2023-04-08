import { Request, Response } from 'express';

import { UserModel } from '@/models';
import { ErrorManager, signToken, TimeHelper, verifyPwd } from '@/utils';

import { UserService } from '../users/user.service';
import { LoginUserDto } from './dtos';

const login = async (req: Request, res: Response) => {
  try {
    const dto = req.body as LoginUserDto;

    const user = (await UserService.findByEmail(dto.email)) as UserModel;

    if (!user) return res.status(401).json({ message: 'INCORRECT_EMAIL_OR_PASSWORD' });

    const validPassword = await verifyPwd(dto.password, user.password);

    if (!validPassword) return res.status(401).json({ message: 'INCORRECT_EMAIL_OR_PASSWORD' });

    const token = await signToken(user);

    const loggedIn = {
      _id: user._id,
      email: user.email,
      username: user.username,
      displayName: `${user.firstName} ${user.lastName}`,
      avatar: user.avatar,
    };

    res.cookie('access', token, {
      path: '/',
      expires: new Date(Date.now() + TimeHelper.ONE_WEEK),
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(200).json({ ok: true, data: loggedIn });
  } catch (error) {
    return ErrorManager(res, error, 'ERROR_LOGIN');
  }
};

const logout = (_req: Request, res: Response) => {
  res.cookie('access', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  return res.status(200).json({ ok: true, message: 'User logged out successfully' });
};

export const AuthController = { login, logout };

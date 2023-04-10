import { Request, Response } from 'express';

import { RequestExtended } from '@/models';
import { ErrorManager, signToken, TimeHelper } from '@/utils';

import { CreateUserDto } from './dtos';
import { UserService } from './user.service';

const getAllUsers = async (req: RequestExtended, res: Response) => {
  try {
    const users = await UserService.getAll(`${req.user?._id}`);
    return res.status(200).json({ ok: true, data: users });
  } catch (error) {
    return ErrorManager(res, error, 'ERROR_GET_ALL_USERS');
  }
};

const getProfile = async (req: RequestExtended, res: Response) => {
  try {
    const user = req.user;
    return res.status(200).json({ ok: true, data: user });
  } catch (error) {
    return ErrorManager(res, error, 'ERROR_GET_PROFILE');
  }
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserService.findById(id);

    if (!user) return res.status(404).json({ message: 'USER_NOT_FOUND' });

    return res.status(200).json({ ok: true, data: user });
  } catch (error) {
    return ErrorManager(res, error, 'ERROR_GET_PROFILE');
  }
};

const registerUser = async (req: RequestExtended, res: Response) => {
  try {
    const dto = req.body as CreateUserDto;

    if (req.file && req.imageName) {
      dto.avatar = req.imageName;
    }
    const user = await UserService.register(dto);

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

    return res.status(201).json({ ok: true, data: loggedIn });
  } catch (error) {
    return ErrorManager(res, error, 'ERROR_REGISTER_USER');
  }
};

export const UserController = { getAllUsers, registerUser, getProfile, getUserById };

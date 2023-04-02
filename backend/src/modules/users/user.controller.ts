import { Request, Response } from 'express';

import { RequestExtended } from '@/models';
import { ErrorManager } from '@/utils';

import { CreateUserDto } from './dtos/create-user.dto';
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

const registerUser = async (req: Request, res: Response) => {
  try {
    const dto = req.body as CreateUserDto;
    const user = await UserService.register(dto);
    return res.status(201).json({ ok: true, data: user });
  } catch (error) {
    return ErrorManager(res, error, 'ERROR_REGISTER_USER');
  }
};

export const UserController = { getAllUsers, registerUser, getProfile };

import { encryptPwd, generateUsername } from '@/utils';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserSchema } from './user.schema';

const getAll = (id: string) => {
  const users = UserSchema.find({ _id: { $ne: id } })
    .select('-password')
    .sort({ createdAt: 'desc' });
  return users;
};

const findByEmail = (email: string) => {
  return UserSchema.findOne({ email });
};

const findById = (id: string) => {
  const user = UserSchema.findById(id).select('-password');
  return user;
};

const register = async (dto: CreateUserDto) => {
  dto.password = await encryptPwd(dto.password);
  const payload = {
    ...dto,
    username: generateUsername(dto.email),
    avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  };
  const user = UserSchema.create(payload);
  return await user;
};

export const UserService = { getAll, register, findByEmail, findById };

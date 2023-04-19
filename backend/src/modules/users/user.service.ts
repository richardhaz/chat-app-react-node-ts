import { encryptPwd } from '@utils/encrypt-and-verify-password';
import { generateUsername } from '@utils/generate-username';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserSchema } from './user.schema';

const getAll = (id: string) => {
  const users = UserSchema.find({ _id: { $ne: id } })
    .select('-password')
    .sort({ createdAt: 'desc' });
  return users;
};

const findByEmail = (email: string) => {
  return UserSchema.findOne({ email }).lean();
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
    avatar: dto.avatar ?? 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  };

  const user = await UserSchema.create(payload);
  return user;
};

export const UserService = { getAll, register, findByEmail, findById };

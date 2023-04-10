import { AxiosUrl } from '@/config/axios-config';
import { GenericResponse, LoggedInModel, UserModel } from '@/shared/models';
import { CreateUserDto } from '../dtos/auth';

const registerUser = (data: CreateUserDto): Promise<GenericResponse<LoggedInModel>> => {
  return AxiosUrl.post('/user/register', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((res) => {
    return res.data;
  });
};

const getAllUsers = (): Promise<GenericResponse<UserModel[]>> => {
  return AxiosUrl.get('/user/all').then((res) => {
    return res.data;
  });
};

const getProfile = (): Promise<GenericResponse<UserModel>> => {
  return AxiosUrl.get('/user/profile').then((res) => {
    return res.data;
  });
};

const getUserById = (id: string): Promise<GenericResponse<UserModel>> => {
  return AxiosUrl.get(`/user/${id}`).then((res) => {
    return res.data;
  });
};

export const UserService = { getAllUsers, getUserById, getProfile, registerUser };

import { AxiosUrl } from '@/config/axios-config';
import { GenericResponse, UserModel } from '@/shared/models';

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

export const UserService = { getAllUsers, getUserById, getProfile };

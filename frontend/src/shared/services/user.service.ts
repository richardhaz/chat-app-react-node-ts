import { AxiosUrl } from '@/config/axios-config';
import { GenericResponse, UserModel } from '@/shared/models';

const getAllUsers = (): Promise<GenericResponse<UserModel[]>> => {
  return AxiosUrl.get('/user/all').then((res) => {
    return res.data;
  });
};

export const UserService = { getAllUsers };

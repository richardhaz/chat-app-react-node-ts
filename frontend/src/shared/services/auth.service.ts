import { AxiosUrl } from '@/config/axios-config';
import { GenericResponse, LoginUserModel } from '@/shared/models';

const login = (data: LoginUserModel): Promise<GenericResponse<string>> => {
  return AxiosUrl.post('/auth/login', data).then((res) => {
    return res.data;
  });
};

export const AuthService = { login };

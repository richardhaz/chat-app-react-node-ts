import { AxiosUrl } from '@/config/axios-config';
import { GenericResponse, LoggedInModel, LoginUserModel } from '@/shared/models';

const login = (data: LoginUserModel): Promise<GenericResponse<LoggedInModel>> => {
  return AxiosUrl.post('/auth/login', data).then((res) => {
    return res.data;
  });
};

export const AuthService = { login };

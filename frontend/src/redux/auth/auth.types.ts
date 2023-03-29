import { LoginUserModel } from '@/shared/models';
import { NavigateFunction } from 'react-router-dom';
import { UseFormReset } from 'react-hook-form';

export interface AuthLoginThunkProps {
  values: LoginUserModel;
  navigate: NavigateFunction;
  reset: UseFormReset<LoginUserModel>;
}

import { LoginUserDto } from '@/shared/dtos/auth';
import { NavigateFunction } from 'react-router-dom';
import { UseFormReset } from 'react-hook-form';

export interface AuthLoginThunkProps {
  values: LoginUserDto;
  navigate: NavigateFunction;
  reset: UseFormReset<LoginUserDto>;
}

import { useAppSelector } from '@/redux/useTypedRedux';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthGuard: React.FC = () => {
  /*   const { token } = useAppSelector((state) => state.auth); */
  const token = true;

  return token ? <Outlet /> : <Navigate replace to="/login" />;
};

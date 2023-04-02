import { useAppSelector } from '@/redux/useTypedRedux';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthGuard: React.FC = () => {
  // TODO: uncomment useAppSelector
  const { token } = useAppSelector((state) => state.auth);
  /*   const token = true; */

  return token ? <Outlet /> : <Navigate replace to="/login" />;
};

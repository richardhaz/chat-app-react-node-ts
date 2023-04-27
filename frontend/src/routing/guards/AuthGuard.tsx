import { useAppSelector } from '@/redux/useTypedRedux';
import { DEFAULT_ROUTES } from '@/shared/constants';

import { Navigate, Outlet } from 'react-router-dom';

export const AuthGuard: React.FC = () => {
  // TODO: uncomment useAppSelector
  const { loggedIn } = useAppSelector(state => state.auth);

  /*   const token = true; */

  return loggedIn?._id ? <Outlet /> : <Navigate replace to={DEFAULT_ROUTES.login} />;
};

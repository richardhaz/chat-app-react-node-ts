import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import { RoutesWrapper } from '@/routing/components';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { AuthGuard } from '@/routing/guards';

import { AppRoutes } from './routing/app-routes';
import { APP_ROUTES, DEFAULT_ROUTES } from './shared/constants';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <RoutesWrapper>
          <Route path={DEFAULT_ROUTES.login} element={<LoginPage />} />
          <Route path={DEFAULT_ROUTES.register} element={<RegisterPage />} />
          <Route path="/" element={<Navigate to={`${APP_ROUTES.baseUrl}`} />} />
          <Route element={<AuthGuard />}>
            <Route path={`${APP_ROUTES.baseUrl}/*`} element={<AppRoutes />} />
          </Route>
        </RoutesWrapper>
      </BrowserRouter>
      {/*       <MessengerButton /> */}
      {/* <UsersListButton /> */}
    </>
  );
};
export default App;

import { BrowserRouter, Route } from 'react-router-dom';
import { RoutesWrapper } from '@/routing/components';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { AuthGuard } from '@/routing/guards';

import { AppRoutes } from './routing/app-routes';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <RoutesWrapper>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<AuthGuard />}>
            <Route path="/*" element={<AppRoutes />} />
          </Route>
        </RoutesWrapper>
      </BrowserRouter>
      {/*       <MessengerButton /> */}
      {/* <UsersListButton /> */}
    </>
  );
};
export default App;

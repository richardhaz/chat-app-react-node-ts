import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import { RoutesWrapper } from '@/routing/components';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { ChatRoutes } from '@/routing/components';
import { APP_NAME } from '@/config';
import { AuthGuard } from '@/routing/guards';
import { MessengerButton } from './shared/components/messenger-button';
import { UsersListButton } from './shared/components/users-list-button';

const App = () => {
  // TODO: create global chat users list drawer

  return (
    <>
      <BrowserRouter>
        <RoutesWrapper>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<AuthGuard />}>
            <Route path="/" element={<Navigate to={`/${APP_NAME}`} replace />} />
            <Route path={`/${APP_NAME}/*`} element={<ChatRoutes />} />
          </Route>
        </RoutesWrapper>
      </BrowserRouter>
      <MessengerButton />
      <UsersListButton />
    </>
  );
};
export default App;

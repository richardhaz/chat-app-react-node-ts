import { PageWrapper } from '@/shared/components/page-wrapper';
import { LoginForm } from './components';
import { useAppSelector } from '@/redux/useTypedRedux';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { loggedIn } = useAppSelector(state => state.auth);

  if (loggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <PageWrapper>
      <LoginForm />
    </PageWrapper>
  );
};

export default LoginPage;

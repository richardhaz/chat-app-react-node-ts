import { PageWrapper } from '@/shared/components/page-wrapper';
import { RegisterForm } from './components';
import { useAppSelector } from '@/redux/useTypedRedux';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
  const { loggedIn } = useAppSelector(state => state.auth);

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <PageWrapper>
      <RegisterForm />
    </PageWrapper>
  );
};

export default RegisterPage;

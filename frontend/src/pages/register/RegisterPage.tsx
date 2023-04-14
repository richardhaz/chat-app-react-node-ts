import { PageWrapper } from '@/shared/components/page-wrapper';
import { useEffect } from 'react';
import { RegisterForm } from './components';
import { useAppSelector } from '@/redux/useTypedRedux';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { loggedIn } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loggedIn) {
    return (
      <PageWrapper>
        <RegisterForm />
      </PageWrapper>
    );
  }
  return <></>;
};

export default RegisterPage;

import React, { useEffect } from 'react';
import { PageWrapper } from '@/shared/components/page-wrapper';
import { LoginForm } from './components';
import { useAppSelector } from '@/redux/useTypedRedux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { loggedIn } = useAppSelector((state) => state.auth);
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
        <LoginForm />
      </PageWrapper>
    );
  }
  return <></>;
};

export default LoginPage;

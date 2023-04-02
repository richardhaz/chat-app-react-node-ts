import React, { useEffect } from 'react';
import { PageWrapper } from '@/shared/components/page-wrapper';
import { LoginForm } from './components';
import { useAppSelector } from '@/redux/useTypedRedux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, []);

  if (!token) {
    return (
      <PageWrapper>
        <LoginForm />
      </PageWrapper>
    );
  }
  return <></>;
};

export default LoginPage;

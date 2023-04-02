import { PageWrapper } from '@/shared/components/page-wrapper';
import { useEffect } from 'react';
import { RegisterForm } from './components';
import { useAppSelector } from '@/redux/useTypedRedux';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
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
        <RegisterForm />
      </PageWrapper>
    );
  }
  return <></>;
};

export default RegisterPage;

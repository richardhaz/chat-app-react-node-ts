import React from 'react';
import styles from './LoginForm.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoginUserDto } from '@/shared/dtos/auth';
import { loginUserYupValidation } from '../utils';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { AuthThunk } from '@/redux/auth/auth.thunk';
import { DEFAULT_ROUTES } from '@/shared/constants';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginUserDto>({ resolver: yupResolver(loginUserYupValidation) });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);

  const onSubmit = (values: LoginUserDto) => {
    dispatch(AuthThunk.login({ values, navigate, reset }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>Authenticate User</h1>
      <div className={styles.inputSeparator}>
        <div className={styles.inputContainer}>
          <label htmlFor="Email" className={styles.inputLabel}>
            Email
          </label>
          <input type="email" id="email" className={styles.inputField} {...register('email')} />
        </div>
        {errors.email && errors.email.message && <span className="">{errors.email.message}</span>}
      </div>

      <div className={styles.inputSeparator}>
        <div className={styles.inputContainer}>
          <label htmlFor="Password" className={styles.inputLabel}>
            Password
          </label>
          <input type="password" id="password" className={styles.inputField} {...register('password')} />
        </div>
        {errors.password && errors.password.message && <span className="">{errors.password.message}</span>}
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'loading...' : 'Sign In'}
      </button>
      <div className={styles.existingUser}>
        <span>Don&apos;t have an account?</span>
        <Link to={DEFAULT_ROUTES.register}>Register</Link>
      </div>
    </form>
  );
};

export default LoginForm;

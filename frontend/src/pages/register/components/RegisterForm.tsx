import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserYupValidation } from '../utils';
import styles from './RegisterForm.module.scss';
import { CreateUserDto } from '@/shared/dtos/auth';
import { useAppDispatch } from '@/redux/useTypedRedux';
import { UserThunk } from '@/redux/user/user.thunk';
import { DEFAULT_ROUTES } from '@/shared/constants';

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateUserDto>({ resolver: yupResolver(registerUserYupValidation) });

  const onSubmit = (values: CreateUserDto) => {
    dispatch(UserThunk.registerUser({ values, navigate, reset }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>Register User</h1>
      <div className={styles.inputSeparator}>
        <div className={styles.inputContainer}>
          <label htmlFor="Email" className={styles.inputLabel}>
            Email
          </label>
          <input type="email" id="email" className={styles.inputField} {...register('email')} />
        </div>
        {errors.email && errors.email.message && <span className="">{errors.email.message}</span>}
      </div>
      <section className={styles.nameFieldRow}>
        <div className={styles.inputSeparator}>
          <div className={styles.inputContainer}>
            <label htmlFor="FirstName" className={styles.inputLabel}>
              First Name
            </label>
            <input type="text" id="firstName" className={styles.inputField} {...register('firstName')} />
          </div>
          {errors.firstName && errors.firstName.message && <span className="">{errors.firstName.message}</span>}
        </div>
        <div className={styles.inputSeparator}>
          <div className={styles.inputContainer}>
            <label htmlFor="LastName" className={styles.inputLabel}>
              Last Name
            </label>
            <input type="text" id="lastName" className={styles.inputField} {...register('lastName')} />
          </div>
          {errors.lastName && errors.lastName.message && <span className="">{errors.lastName.message}</span>}
        </div>
      </section>
      <div className={styles.inputSeparator}>
        <div className={styles.inputContainer}>
          <label htmlFor="Password" className={styles.inputLabel}>
            Password
          </label>
          <input type="password" id="password" className={styles.inputField} {...register('password')} />
        </div>
        {errors.password && errors.password.message && <span className="">{errors.password.message}</span>}
      </div>
      <div className={styles.inputSeparator}>
        <div className={styles.inputContainer}>
          <label htmlFor="ConfirmPassword" className={styles.inputLabel}>
            Confirm Password
          </label>
          <input type="password" id="confirmPassword" className={styles.inputField} {...register('confirmPassword')} />
        </div>
        {errors.confirmPassword && errors.confirmPassword.message && (
          <span className="">{errors.confirmPassword.message}</span>
        )}
      </div>
      <div className={styles.inputSeparator}>
        <div className={styles.inputContainer}>
          <label htmlFor="ChooseAvatar" className={styles.inputLabel}>
            Choose Avatar (Optional)
          </label>
          <input type="file" className={styles.inputField} {...register('avatar')} />
        </div>
        {errors.avatar && errors.avatar.message && <span className="">{errors.avatar.message}</span>}
      </div>
      <button type="submit">Create My Account</button>
      <div className={styles.existingUser}>
        <span>Already have an account?</span>
        <Link to={DEFAULT_ROUTES.login}>Login</Link>
      </div>
    </form>
  );
};

export default RegisterForm;

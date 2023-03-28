import * as Yup from 'yup';

export const registerUserYupValidation = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .min(3, '3 characters min')
    .max(50, '50 character max')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid first name'),
  lastName: Yup.string()
    .required('Last Name is required')
    .min(3, '3 characters min')
    .max(50, '50 character max')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid last name'),
  // .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/, 'Please enter valid name'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(8, '6 characters min')
    .max(18, '18 character max')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,18}\S$/,
      'Please provide a valid password. One uppercase, one lowercase, one special character and no spaces'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.')
});

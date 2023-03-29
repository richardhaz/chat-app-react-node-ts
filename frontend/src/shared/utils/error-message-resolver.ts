export const errorMessageResolver = (error: any): String => {
  const message = error?.response?.data?.message || error?.message || error?.toString();

  switch (message) {
    // Authorization
    case 'NOT_FOUND :: USER_NOT_FOUND': {
      const errorMessage = 'User not found';
      return errorMessage;
    }
    case 'BAD_REQUEST :: INCORRECT_LOGIN_METHOD_USE_GOOGLE': {
      const errorMessage = 'Your account is associated with google, please use it to log in';
      return errorMessage;
    }
    case 'UNAUTHORIZED :: INVALID_CREDENTIALS': {
      const errorMessage = 'Incorrect email or password';
      return errorMessage;
    }
    // Products
    default: {
      return 'Network Error';
    }
  }
};

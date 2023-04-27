export const errorMessageResolver = (error: any): String => {
  const message = error?.response?.data?.message || error?.message || error?.toString();

  switch (message) {
    // Authorization
    case 'NOT_FOUND :: USER_NOT_FOUND': {
      const errorMessage = 'User not found';
      return errorMessage;
    }
    case 'INCORRECT_EMAIL_OR_PASSWORD': {
      const errorMessage = 'Incorrect email or password';
      return errorMessage;
    }
    // Products
    default: {
      return 'Network Error';
    }
  }
};

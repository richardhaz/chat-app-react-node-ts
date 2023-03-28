export interface LoginUserModel {
  email: string;
  password: string;
}

export interface RegisterUserModel {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

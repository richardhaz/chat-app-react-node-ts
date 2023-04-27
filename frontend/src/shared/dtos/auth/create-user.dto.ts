export interface CreateUserDto {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

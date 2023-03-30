import { IsEmailUnique, IsEqualTo } from '@common/constraints';
import { IsString, IsNotEmpty, IsEmail, MinLength, Length } from 'class-validator';

export class RegisterUserDto {
	@IsNotEmpty()
	@IsEmail()
	@IsEmailUnique()
	email: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	password: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@IsEqualTo(RegisterUserDto, (s) => s.password)
	confirmPassword: string;

	@IsNotEmpty()
	@IsString()
	@Length(3, 25)
	firstName: string;

	@IsNotEmpty()
	@IsString()
	@Length(3, 25)
	lastName: string;
}

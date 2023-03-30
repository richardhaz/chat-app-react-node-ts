import { IsNotEmpty, IsOptional, IsString, Length, MinLength } from 'class-validator';

export class UserPhoneClass {
	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	code: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	number: string;
}

export class UserAddressClass {
	@IsString()
	@IsNotEmpty()
	@Length(6, 80)
	line1: string;

	@IsOptional()
	@IsString()
	@Length(6, 80)
	line2?: string;

	@IsString()
	@IsNotEmpty()
	@Length(3, 30)
	city: string;

	@IsString()
	@IsNotEmpty()
	@Length(3, 30)
	state: string;

	@IsString()
	@IsNotEmpty()
	@Length(3, 50)
	country: string;

	@IsString()
	@IsNotEmpty()
	@Length(3, 30)
	zip: string;
}

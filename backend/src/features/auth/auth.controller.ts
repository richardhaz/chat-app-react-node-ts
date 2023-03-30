import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() dto: LoginUserDto) {
		return await this.authService.login(dto);
	}
	@Post('register')
	async register(@Body() dto: RegisterUserDto) {
		return await this.authService.register(dto);
	}
}

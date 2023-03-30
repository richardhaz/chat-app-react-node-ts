import { UserModel } from '@common/models';
import { encryptPwd, ErrorManager, generateUsername, verifyPwd } from '@common/utils';
import { User, UserDocument } from '@features/users/schemas/users.schema';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dtos';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		private readonly jwtService: JwtService,
	) {}

	async login(dto: LoginUserDto) {
		try {
			const user: UserModel = await this.userModel.findOne({ email: dto.email });

			if (!user) throw new ErrorManager({ type: 'NOT_FOUND', message: 'USER_NOT_FOUND' });

			const match = await verifyPwd(dto.password, user.password);

			if (!match) throw new ErrorManager({ type: 'UNAUTHORIZED', message: 'INVALID_CREDENTIALS' });

			const payload = { id: user['_id'] };

			const token = this.jwtService.sign(payload);

			return { ok: true, data: token };
		} catch (error) {
			throw ErrorManager.createSignatureError(error.message);
		}
	}

	async register(dto: RegisterUserDto) {
		try {
			dto.password = await encryptPwd(dto.password);

			const payload = {
				...dto,
				username: generateUsername(dto.email),
			};

			return this.userModel.create(payload);
		} catch (error) {
			throw ErrorManager.createSignatureError(error.message);
		}
	}
}

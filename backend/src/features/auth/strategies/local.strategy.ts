import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtDataModel } from '@common/models';
import { envConfig } from '@config/environment';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@features/users/schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
			ignoreExpiration: false,
			secretOrKey: envConfig().jwt.secret,
		});
	}

	async validate(payload: JwtDataModel | null) {
		return await this.userModel.findById(`${payload.id}`);
	}
}

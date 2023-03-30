import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { collections, mongooseForFeatureContainer } from '@config/mongoose';
import { JwtStrategy } from './strategies';

@Module({
	imports: [mongooseForFeatureContainer([collections[0].user])],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

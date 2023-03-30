import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { collections, mongooseForFeatureContainer } from '@config/mongoose';
import { UniqueEmailConstraint } from '@common/constraints';

@Module({
	imports: [mongooseForFeatureContainer([collections[0].user])],
	controllers: [UsersController],
	providers: [UsersService, UniqueEmailConstraint],
})
export class UsersModule {}

import { USER_STATUS } from '@common/constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export type UserAttributes = Partial<keyof User>;

@Schema({
	timestamps: true,
	versionKey: false,
})
export class User {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: true, unique: true })
	username: string;

	@Prop({ required: true })
	firstName: string;

	@Prop({ required: true })
	lastName: string;

	@Prop({ required: false })
	avatar: string;

	@Prop({ required: false })
	messages: string[];

	/* 	@Prop({ required: false })
	groups: string[]; */

	@Prop({
		type: String,
		required: true,
		enum: [USER_STATUS.ACTIVE, USER_STATUS.DISABLED, USER_STATUS.RESTRICTED],
		default: USER_STATUS.ACTIVE,
	})
	status: USER_STATUS;
}

export const UserSchema = SchemaFactory.createForClass(User);

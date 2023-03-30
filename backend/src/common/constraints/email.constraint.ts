import { ErrorManager } from '@common/utils';
import { User, UserDocument } from '@features/users/schemas/users.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';

@ValidatorConstraint({ name: 'IsEmailUnique', async: true })
@Injectable()
export class UniqueEmailConstraint implements ValidatorConstraintInterface {
	constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

	async validate(email: string): Promise<boolean> {
		try {
			console.log(email);
			const foundUser = await this.userModel.findOne({ email });

			if (!foundUser) return true;

			return false;
		} catch (error) {
			console.log(error.message);
			throw ErrorManager.createSignatureError(error.message);
		}
	}

	defaultMessage(args: ValidationArguments) {
		return `The email ${args.value} is already taken`;
	}
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: UniqueEmailConstraint,
		});
	};
}

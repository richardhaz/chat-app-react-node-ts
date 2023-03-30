import { HttpException, HttpStatus } from '@nestjs/common';

interface ErrorManagerProps {
	type: keyof typeof HttpStatus;
	message: string;
}

export class ErrorManager extends Error {
	constructor({ type, message }: ErrorManagerProps) {
		super(`${type} :: ${message}`);
	}

	public static createSignatureError(error: string) {
		const statusName = error.split(' :: ')[0];
		if (statusName) {
			throw new HttpException(error, HttpStatus[statusName]);
		} else {
			throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

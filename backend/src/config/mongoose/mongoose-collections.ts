import { User, UserSchema } from '@features/users/schemas/users.schema';

export const collections = [
	{
		user: {
			name: User.name,
			schema: UserSchema,
		},
	},
];

export const envConfig = () => ({
	app: {
		host: process.env.APP_HOST,
		port: process.env.APP_PORT,
		environment: process.env.ENVIRONMENT,
	},
	client: {
		baseUrl: process.env.CLIENT_BASE_URL,
		successGoogleSession: process.env.CLIENT_SUCCESS_GOOGLE_SESSION,
		failureGoogleSession: process.env.CLIENT_FAILURE_GOOGLE_SESSION,
		continueWithGoogle: process.env.CLIENT_CONTINUE_WITH_GOOGLE,
	},
	google: {
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackUrl: process.env.GOOGLE_CALLBACK_URL,
	},
	db: {
		uri: process.env.DB_URI,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		expiration: process.env.JWT_EXPIRATION_TIME,
	},
});

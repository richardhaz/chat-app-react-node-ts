import express from 'express';

import { AuthController } from './auth.controller';
import { AuthValidation } from './validations';

const AuthRoute = express.Router();

AuthRoute.post('/login', AuthValidation.login, AuthController.login);

export { AuthRoute };

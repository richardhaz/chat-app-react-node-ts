import express from 'express';

import { AuthController } from './auth.controller';

const AuthRoute = express.Router();

AuthRoute.post('/login', AuthController.login);

export { AuthRoute };

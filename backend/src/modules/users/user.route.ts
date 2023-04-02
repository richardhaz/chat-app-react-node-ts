import express from 'express';

import { sessionMiddleware } from '@/middlewares';

import { UserController } from './user.controller';
import { UserValidation } from './validations';

const UserRoute = express.Router();

UserRoute.get('/all', sessionMiddleware, UserController.getAllUsers);
UserRoute.post('/register', UserValidation.registerUser, UserController.registerUser);
UserRoute.get('/profile', sessionMiddleware, UserController.getProfile);

export { UserRoute };

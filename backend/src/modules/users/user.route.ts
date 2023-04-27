import express from 'express';

import { sessionMiddleware, uploadFileMiddleware } from '@middlewares/index';

import { UserController } from './user.controller';
import { UserValidation } from './validations';

const UserRoute = express.Router();

UserRoute.get('/all', sessionMiddleware, UserController.getAllUsers);
UserRoute.post(
  '/register',
  uploadFileMiddleware('images/avatars').single('avatar'),
  UserValidation.registerUser,
  UserController.registerUser,
);
UserRoute.get('/profile', sessionMiddleware, UserController.getProfile);
UserRoute.get('/:id', sessionMiddleware, UserValidation.validateId, UserController.getUserById);

export { UserRoute };

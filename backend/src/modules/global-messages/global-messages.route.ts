import express from 'express';

import { sessionMiddleware } from '@/middlewares';

import { GlobalMessageController } from './global-messages.controller';
import { GlobalMessageValidation } from './validations';

const GlobalMessageRoute = express.Router();

GlobalMessageRoute.get('/all', sessionMiddleware, GlobalMessageController.getAllMessages);
GlobalMessageRoute.post(
  '/create',
  sessionMiddleware,
  GlobalMessageValidation.createMessage,
  GlobalMessageController.getAllMessages,
);

export { GlobalMessageRoute };

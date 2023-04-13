import express from 'express';

import { sessionMiddleware } from '@/middlewares';

import { GlobalMessageController } from './global-messages.controller';
import { GlobalMessageValidation } from './validations';

const GlobalMessageRoute = express.Router();

GlobalMessageRoute.post(
  '/all',
  sessionMiddleware,
  GlobalMessageValidation.getMessages,
  GlobalMessageController.getAllMessages,
);
GlobalMessageRoute.post(
  '/create',
  sessionMiddleware,
  GlobalMessageValidation.createMessage,
  GlobalMessageController.createMessage,
);

export { GlobalMessageRoute };

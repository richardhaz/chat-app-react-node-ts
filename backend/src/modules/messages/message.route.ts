import express from 'express';

import { sessionMiddleware } from '@/middlewares';

import { MessageController } from './message.controller';
import { MessageValidation } from './validations';

const MessageRoute = express.Router();

MessageRoute.post('/all', sessionMiddleware, MessageValidation.getMessages, MessageController.getAllMessages);
MessageRoute.post('/create', sessionMiddleware, MessageValidation.createMessage, MessageController.createMessage);

export { MessageRoute };

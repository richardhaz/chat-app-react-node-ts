import express from 'express';

import { sessionMiddleware } from '@/middlewares';

import { ConversationController } from './conversation.controller';
import { ConversationValidation } from './validations';

const ConversationRoute = express.Router();

ConversationRoute.post(
  '/find-by-members',
  sessionMiddleware,
  ConversationValidation.findConversation,
  ConversationController.findConversation,
);

ConversationRoute.post(
  '/find-all-my-conversations',
  sessionMiddleware,
  ConversationValidation.findAllMyConversations,
  ConversationController.findAllMyConversations,
);

ConversationRoute.post(
  '/create',
  sessionMiddleware,
  ConversationValidation.createConversation,
  ConversationController.createConversation,
);

export { ConversationRoute };

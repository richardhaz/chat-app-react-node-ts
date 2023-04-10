import express from 'express';

import { sessionMiddleware } from '@/middlewares';

import { ConversationController } from './conversation.controller';
import { ConversationValidation } from './validations';

const ConversationRoute = express.Router();

ConversationRoute.post(
  '/find-by-members',
  sessionMiddleware,
  ConversationValidation.findConversationByMembers,
  ConversationController.findConversationByMembers,
);

ConversationRoute.post(
  '/all-my-conversations',
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

ConversationRoute.patch(
  '/update-last-message-status',
  sessionMiddleware,
  ConversationValidation.updateLastMessageStatus,
  ConversationController.updateLastMessageStatus,
);

ConversationRoute.post(
  '/get-conversation-by-id',
  sessionMiddleware,
  ConversationValidation.getConversationById,
  ConversationController.getConversationById,
);

export { ConversationRoute };

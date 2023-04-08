import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import { AuthRoute } from '@/modules/auth/auth.route';
import { ConversationRoute } from '@/modules/conversations/conversation.route';
import { MessageRoute } from '@/modules/messages/message.route';
import { UserRoute } from '@/modules/users/user.route';

import { corsConfig } from './config';
import { routeNotFound } from './utils';

const server = express();
server.use(cors({ ...corsConfig() }));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/api/auth', AuthRoute);
server.use('/api/user', UserRoute);
server.use('/api/message', MessageRoute);
server.use('/api/conversation', ConversationRoute);
server.use(routeNotFound);

export { server };

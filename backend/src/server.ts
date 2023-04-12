import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { corsConfig } from '@/config';
import { AuthRoute } from '@/modules/auth/auth.route';
import { ConversationRoute } from '@/modules/conversations/conversation.route';
import { MessageRoute } from '@/modules/messages/message.route';
import { UserRoute } from '@/modules/users/user.route';
import { routeNotFound } from '@/utils';

import { GlobalMessageRoute } from './modules/global-messages/global-messages.route';

const server = express();
server.use(cors(corsConfig));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(helmet());

const PREFIX_API = '/api';

server.use(`${PREFIX_API}/auth`, AuthRoute);
server.use(`${PREFIX_API}/user`, UserRoute);
server.use(`${PREFIX_API}/message`, MessageRoute);
server.use(`${PREFIX_API}/global-message`, GlobalMessageRoute);
server.use(`${PREFIX_API}/conversation`, ConversationRoute);
server.use(routeNotFound);

export { server };

import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import { AuthRoute } from '@/modules/auth/auth.route';
import { UserRoute } from '@/modules/users/user.route';

import { corsConfig } from './config';

const server = express();
server.use(cors({ ...corsConfig() }));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/api/auth', AuthRoute);
server.use('/api/user', UserRoute);

export { server };

import 'dotenv/config';

import http from 'http';
import { Server as SocketServer } from 'socket.io';

import { envConfig } from '@config/env-config';
import { dbConnect } from '@db/db-connection';

import { corsConfig } from './config';
import { server } from './server';
import { chatSocket } from '@sockets/chat.socket';
import { logger } from '@utils/logger';

const appPort = envConfig().app.port as string;
const socketPort = Number(envConfig().socket.port);
const environment = envConfig().app.environment as string;

const httpServer = http.createServer(server);
const io = new SocketServer(httpServer, { cors: corsConfig });

const bootstrap = async (): Promise<void> => {
  try {
    logger.info('Loading services..');
    const res = await dbConnect();
    if (res) {
      logger.info('Db connected');
      chatSocket(io);
      server.listen(appPort, () => logger.info(`Server running on port ${appPort} in ${`${environment}`} mode`));
      logger.info(`Socket running on port ${socketPort}`);
      io.listen(socketPort);
    }
  } catch (error: any) {
    console.log(error.message);
    process.exit(0);
  }
};

bootstrap();

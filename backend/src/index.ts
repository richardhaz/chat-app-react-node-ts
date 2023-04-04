import 'dotenv/config';

import http from 'http';
import { Server as SocketServer } from 'socket.io';

import { corsConfig, envConfig } from '@/config';
import { dbConnect } from '@/db';
import { logger } from '@/utils';

import { server } from './server';
import { chatSocket } from './sockets';

const appPort = envConfig().app.port as string;
const environment = envConfig().app.environment as string;

const httpServer = http.createServer(server);

const io = new SocketServer(httpServer, { cors: corsConfig() });

const bootstrap = async (): Promise<void> => {
  try {
    logger.info('loading services..');
    const res = await dbConnect();
    if (res) {
      logger.info('db connected');
      chatSocket(io);
      httpServer.listen(appPort, () => logger.info(`server running on ${`${environment}`} mode`));
    }
  } catch (error: any) {
    console.log(error.message);
    process.exit(0);
  }
};

bootstrap();

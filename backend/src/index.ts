import 'dotenv/config';

import { logger } from '@/utils';

import { envConfig } from './config/env-config';
import dbConnect from './db/db-connection';
import { server } from './server';

const port = envConfig().app.port as string;
const environment = envConfig().app.environment as string;

const bootstrap = async (): Promise<void> => {
  try {
    logger.info('Loading services..');
    const res = await dbConnect();
    if (res) {
      logger.info('db connected');
      server.listen(port, () => logger.info(`server running on ${`${environment}`} mode`));
    }
  } catch (error: any) {
    console.log(error.message);
    process.exit(0);
  }
};

bootstrap();

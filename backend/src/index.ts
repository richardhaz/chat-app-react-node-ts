import 'dotenv/config';

import { envConfig } from '@config/env-config';
import { dbConnect } from '@db/db-connection';

import { server } from './server';
import { logger } from '@utils/logger';

const appPort = envConfig().app.port as string;
const environment = envConfig().app.environment as string;

const bootstrap = async (): Promise<void> => {
  try {
    logger.info('Loading services..');
    const res = await dbConnect();
    if (res) {
      logger.info('Db connected');
      server.listen(appPort, () => logger.info(`Server running on port ${appPort} in ${`${environment}`} mode`));
    }
  } catch (error: any) {
    console.log(error.message);
    process.exit(0);
  }
};

bootstrap();

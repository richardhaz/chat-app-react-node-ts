import 'dotenv/config';

import { connect } from 'mongoose';

import { envConfig } from '@config/index';

export const dbConnect = () => {
  const dbUri = envConfig().db.uri as string;
  return connect(dbUri);
};

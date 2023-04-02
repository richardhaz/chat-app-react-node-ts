import 'dotenv/config';

import { connect } from 'mongoose';

import { envConfig } from '@/config/env-config';

const dbConnect = () => {
  const dbUri = envConfig().db.uri as string;
  return connect(dbUri);
};

export default dbConnect;

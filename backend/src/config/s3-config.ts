import aws from 'aws-sdk';

import { envConfig } from '@/config';

const secretAccessKey = envConfig().aws.s3.secretAccessKey;
const accessKeyId = envConfig().aws.s3.accessKeyId;
const region = envConfig().aws.s3.bucketRegion;

aws.config.update({
  secretAccessKey,
  accessKeyId,
  region,
});

export const s3 = new aws.S3();

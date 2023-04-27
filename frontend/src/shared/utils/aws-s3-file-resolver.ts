import { envConfig } from '@/config';

const bucketName = envConfig().aws.s3.bucketName;
const projectName = envConfig().aws.s3.projectName;
const amazonS3Url = envConfig().aws.s3.baseUrl;

export const S3Avatar = (filename: string) => {
  const avatarPath = 'images/avatars';
  const avatar = `https://${bucketName}.${amazonS3Url}/${projectName}/${avatarPath}/${filename}`;
  return avatar;
};

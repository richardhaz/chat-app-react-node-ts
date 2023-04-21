export const envConfig = () => ({
  app: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
    environment: process.env.ENVIRONMENT,
    allowedOrigin: process.env.ALLOWED_ORIGIN,
  },
  socket: {
    port: process.env.SOCKET_PORT,
  },
  db: {
    uri: process.env.DB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION_TIME,
  },
  aws: {
    s3: {
      projectName: process.env.AWS_PROJECT_NAME,
      bucketName: process.env.AWS_BUCKET_NAME,
      bucketRegion: process.env.AWS_BUCKET_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  },
});

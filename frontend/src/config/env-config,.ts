export const envConfig = () => ({
  text: import.meta.env.VITE_TEXT,
  apiUrl: import.meta.env.VITE_API_URL,
  sockerUrl: import.meta.env.VITE_SOCKET_URL,
  aws: {
    s3: {
      projectName: import.meta.env.VITE_AWS_PROJECT_NAME,
      bucketName: import.meta.env.VITE_AWS_BUCKET_NAME,
      bucketRegion: import.meta.env.VITE_AWS_BUCKET_REGION,
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      baseUrl: import.meta.env.VITE_AWS_S3_BASE_URL
    }
  }
});

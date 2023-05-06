import { envConfig } from './env-config';

const defaultOrigins = ['http://localhost:5173', 'http://localhost:3005'];
const prodOrigins = envConfig().app.allowedOrigin?.split(',') as string[];

export const corsConfig = {
  credentials: true,
  methods: 'GET, POST, PUT, PATCH, DELETE',
  origin: prodOrigins ? [...defaultOrigins, ...prodOrigins] : defaultOrigins,
};

console.log(corsConfig.origin);

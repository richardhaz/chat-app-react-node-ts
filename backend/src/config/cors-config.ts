import { envConfig } from './env-config';

const defaultOrigins = ['http://localhost:5173', 'http://localhost:3005'];
const prodOrigin = envConfig().app.allowedOrigin;

export const corsConfig = {
  credentials: true,
  methods: 'GET, POST, PUT, PATCH, DELETE',
  origin: prodOrigin ? [...defaultOrigins, prodOrigin] : defaultOrigins,
};

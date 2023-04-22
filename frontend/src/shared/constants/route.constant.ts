import { envConfig } from '@/config';

export const suffixUrl = envConfig().suffixUrl ?? 'app';

export const DEFAULT_ROUTES = {
  login: `/${suffixUrl}/login`,
  register: `/${suffixUrl}/register`
};

export const APP_ROUTES = {
  baseUrl: `/${suffixUrl}`,
  chat: `/${suffixUrl}/chat`
};

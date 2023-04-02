import { getPersistedToken } from '@/shared/utils';
import axios from 'axios';

const AxiosUrl = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
});

AxiosUrl.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${getPersistedToken()}`;
  return req;
});

export { AxiosUrl };

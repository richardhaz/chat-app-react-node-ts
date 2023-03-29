import axios from 'axios';

const AxiosUrl = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
});

export { AxiosUrl };

/* export const ApiUrl = import.meta.env.VITE_API_URL; */

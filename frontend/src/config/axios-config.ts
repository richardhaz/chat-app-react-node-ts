import axios from 'axios';

const AxiosUrl = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000
});

export { AxiosUrl };

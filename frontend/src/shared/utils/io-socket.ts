import io from 'socket.io-client';
import { envConfig } from '@/config';

export const ioSocket = () => io(envConfig().sockerUrl);

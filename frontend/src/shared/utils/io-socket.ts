import { envConfig } from '@/config';
import io from 'socket.io-client';

export const ioSocket = () => io(envConfig().sockerUrl);

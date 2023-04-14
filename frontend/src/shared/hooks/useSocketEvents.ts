import { useEffect } from 'react';
import { ioSocket } from '../utils';

export interface Event {
  name: string;
  handler(...args: any[]): any;
}

export function useSocketEvents(events: Event[]) {
  const socket = ioSocket();

  useEffect(() => {
    for (const event of events) {
      socket.on(event.name, event.handler);
    }

    return function () {
      for (const event of events) {
        socket.off(event.name);
      }
    };
  }, []);
}

import { useEffect } from 'react';
import { ioSocket } from '../utils';

export interface EventProps {
  name: string;
  handler(...args: any[]): any;
}

export function useSocketEvents(events: EventProps[]) {
  const socket = ioSocket();

  useEffect(() => {
    for (const event of events) {
      socket.on(event.name, event.handler);
    }

    return function () {
      for (const event of events) {
        socket.off(event.name);
      }
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

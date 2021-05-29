import { createModel } from 'hox';
import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { SERVER } from '../config';

export const useSocketIo = createModel(() => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [deviceConnected, setDeviceConnected] = useState(false);

  const initSocket = useCallback((token: string) => {
    setSocket((prevSocket) => {
      if (prevSocket?.connected) {
        prevSocket.disconnect();
      }
      setDeviceConnected(false);
      const nextSocket = io(SERVER, {
        query: {
          token,
          ctype: 'client',
        },
        transports: ['websocket', 'polling'],
      });
      nextSocket.connect();
      const onDisconnect = () => {
        setDeviceConnected(false);
        nextSocket.close();
      };
      nextSocket.on('connect', () => setDeviceConnected(true));
      nextSocket.on('disconnect', onDisconnect);
      nextSocket.on('hl_device_leave', onDisconnect);
      return nextSocket;
    });
  }, []);

  return { socket, initSocket, deviceConnected };
});

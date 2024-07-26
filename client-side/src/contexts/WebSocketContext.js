import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(process.env.REACT_APP_API_URL);
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const socketIo = io(process.env.REACT_APP_API_URL, {
      query: {
        token: token,
      },
      transports: ["websocket"],
    });

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

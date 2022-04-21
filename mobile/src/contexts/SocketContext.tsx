import React from "react";
import { SOCKET_URI } from "react-native-dotenv";
import io from "socket.io-client";

export const socket = io(SOCKET_URI, {
  autoConnect: false,
});
export const SocketContext = React.createContext(socket);

export const SocketProvider: React.FC = ({ children }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

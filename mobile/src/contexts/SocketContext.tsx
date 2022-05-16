import React from "react";
import { SOCKET_URI } from "react-native-dotenv";
import io from "socket.io-client";

console.log(SOCKET_URI)
export const socket = io("http://192.168.252.69:3000/", {
  autoConnect: false,
});
export const SocketContext = React.createContext(socket);

export const SocketProvider: React.FC = ({ children }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

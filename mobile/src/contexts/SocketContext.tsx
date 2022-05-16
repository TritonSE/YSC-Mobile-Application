import Constants from "expo-constants";
import React from "react";
import io from "socket.io-client";

const SOCKET_URI = Constants.manifest?.extra?.SOCKET_URI;

export const socket = io(SOCKET_URI, {
  autoConnect: false,
});
export const SocketContext = React.createContext(socket);

export const SocketProvider: React.FC = ({ children }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

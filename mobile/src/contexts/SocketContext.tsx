import React, { useContext } from "react";
import io from "socket.io-client";

export const socket = io("http://localhost:3000", {
  autoConnect: false,
});
export const SocketContext = React.createContext(socket);

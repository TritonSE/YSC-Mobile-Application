import React, { useContext } from "react";
import io from "socket.io-client";

import { UserContext } from "./UserContext";

const user = useContext(UserContext);
export const socket = io("http://localhost:3000", {
  auth: {
    username: user.userState.username,
  },
});
export const SocketContext = React.createContext(socket);

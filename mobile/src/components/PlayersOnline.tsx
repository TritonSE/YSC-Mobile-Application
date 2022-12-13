import React, { useState, useEffect, useContext } from "react";
import { Text } from "react-native";

import { SocketContext } from "../contexts/SocketContext";

const PlayersOnline = () => {
  const socket = useContext(SocketContext);

  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    const int = setInterval(() => {
      socket.emit("request player count");
    }, 5000);
    socket.emit("request player count");
    socket.on("send player count", setPlayerCount);

    return () => {
      clearInterval(int);
      socket.off("send player count");
    };
  }, []);

  return (
    <Text style={{ fontSize: 18, marginTop: 5 }}>
      {playerCount} Player{playerCount !== 1 ? "s" : ""} Online
    </Text>
  );
};

export default PlayersOnline;

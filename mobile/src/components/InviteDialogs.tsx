import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";

import { SocketContext } from "../contexts/SocketContext";

import TwoButtonPopup from "./popups/TwoButtonPopup";

const InviteDialogs = () => {
  const navigation = useNavigation();
  const socket = useContext(SocketContext);
  const [dialog, setDialog] = useState();

  useEffect(() => {
    socket.on("invited", (username, isMentorSession) => {
      setDialog({ username, isMentorSession });
    });
    socket.on("uninvited", () => {
      setDialog();
    });

    socket.on("successful assign", (color: string, names: string[]) => {
      navigation.navigate("ChessScreen", { color, players: names });
    });

    return () => {
      socket.off("invited");
      socket.off("uninvited");
      socket.off("successful assign");
    };
  }, []);

  if (dialog) {
    return (
      <TwoButtonPopup
        labelText={`${dialog.username} has invited you to a ${
          dialog.isMentorSession ? "mentor session" : "game"
        }.  Accept?`}
        noFunc={() => {
          socket.emit("decline invite");
          setDialog();
        }}
        yesFunc={() => {
          socket.emit("accept invite");
          setDialog();
        }}
      />
    );
  }

  return null;
};

export default InviteDialogs;

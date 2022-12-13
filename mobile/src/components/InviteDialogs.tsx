import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";

import { SocketContext } from "../contexts/SocketContext";

import TwoButtonPopup from "./popups/TwoButtonPopup";

const InviteDialogs = () => {
  const navigation = useNavigation();
  const socket = useContext(SocketContext);
  const [dialog, setDialog] = useState();

  useEffect(() => {
    socket.on("invited", (username) => {
      setDialog(username);
    });
    socket.on("uninvited", () => {
      setDialog();
    });

    socket.on("successful assign", (color: string, names: string[]) => {
      navigation.navigate("Chess", { color, players: names });
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
        labelText={`${dialog} has invited you to a game.  Accept?`}
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

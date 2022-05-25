import React, { useContext } from "react";
import { View } from "react-native";

import { SocketContext } from "../../contexts/SocketContext";
import TwoButtonPopup from "../popups/TwoButtonPopup";

const Gameover = ({ isGameOver, playerWhoLost }) => {
  const gameOverMessage = {
    w: "Black has won. Rematch?",
    b: "White has won. Rematch?",
  };
  const socket = useContext(SocketContext);

  const quitGame = () => {
    socket.emit("no rematch");
  };

  const rematchGame = () => {
    socket.emit("rematch");
  };

  // When gameover, display a popup to notify the players
  return (
    <View>
      {isGameOver && (
        <TwoButtonPopup
          labelText={gameOverMessage[playerWhoLost]}
          noFunc={quitGame}
          yesFunc={rematchGame}
        />
      )}
    </View>
  );
};

export default Gameover;

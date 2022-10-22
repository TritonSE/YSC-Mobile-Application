import React, { useContext } from "react";
import { View } from "react-native";

import { SocketContext } from "../../contexts/SocketContext";
import GameOverPopup from "../popups/GameOverPopup";

const Gameover = ({ isGameOver, outcomeVar }) => {
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
        <GameOverPopup outcomeVar={outcomeVar} noFunc={quitGame} yesFunc={rematchGame} />
      )}
    </View>
  );
};

export default Gameover;

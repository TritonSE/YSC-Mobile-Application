import React, { useContext } from "react";
import { View } from "react-native";

import loseMascot from "../../../assets/mascot.png";
import winMascot from "../../../assets/mascot_waving.png";
import { SocketContext } from "../../contexts/SocketContext";
import GameOverPopup from "../popups/GameOverPopup";

const Gameover = ({ isGameOver, didLose }) => {
  const gameOverMessage = didLose ? "Good Effort, Try Again!" : "Great Work, You Win!";
  const mascot = didLose ? loseMascot : winMascot;
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
        <GameOverPopup
          labelText={gameOverMessage}
          mascot={mascot}
          noFunc={quitGame}
          yesFunc={rematchGame}
        />
      )}
    </View>
  );
};

export default Gameover;

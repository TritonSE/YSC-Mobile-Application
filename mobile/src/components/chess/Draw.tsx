import React, { useContext } from "react";
import { View } from "react-native";


import drawMascot from "../../../assets/Stemett_and_Mascot.png"
import { SocketContext } from "../../contexts/SocketContext";
import GameOverPopup from "../popups/GameOverPopup";

const Gameover = ({isDraw}) => {
  const drawMessage = "It's a Stalemate!";
  const mascot = drawMascot;
  const socket = useContext(SocketContext);

  const quitGame = () => {
    socket.emit("no rematch");
  };

  const rematchGame = () => {
    socket.emit("rematch");
  };

  // When draw, display a popup to notify the players
  return (
    <View>
      {isGameOver && (
        <GameOverPopup
          labelText={drawMessage}
          mascot={mascot}
          noFunc={quitGame}
          yesFunc={rematchGame}
        />
      )}
    </View>
  );
};

export default Gameover;

import React, { useState, useEffect } from "react";
import { View } from "react-native";

import GameOverPopup from "../popups/GameOverPopup";

const Gameover = ({ chess, state, draw, disconnect }) => {
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (disconnect) {
      setGameOver("disconnect");
    } else if (chess.in_checkmate()) {
      setGameOver(state.player === state.myColor ? "loss" : "win");
    } else if (chess.in_stalemate()) {
      setGameOver("stalemate");
    } else if (draw || chess.in_draw()) {
      setGameOver("draw");
    } else {
      setGameOver(false);
    }
  }, [state, draw, disconnect]);

  // When gameover, display a popup to notify the players
  return <View>{gameOver && <GameOverPopup outcome={gameOver} />}</View>;
};

export default Gameover;

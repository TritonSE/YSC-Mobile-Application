import React, { useState, useEffect } from "react";
import { View } from "react-native";

import GameOverPopup from "../popups/GameOverPopup";

const Gameover = ({ chess, state, draw, disconnect }) => {
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (disconnect) {
      setGameOver("disconnect");
    }
    if (chess.in_checkmate()) {
      setGameOver(state.player === state.myColor ? "loss" : "win");
    }
    if (chess.in_stalemate()) {
      setGameOver("stalemate");
    }
    if (draw || chess.in_draw()) {
      setGameOver("draw");
    }
  }, [state, draw, disconnect]);

  // When gameover, display a popup to notify the players
  return <View>{gameOver && <GameOverPopup outcome={gameOver} />}</View>;
};

export default Gameover;

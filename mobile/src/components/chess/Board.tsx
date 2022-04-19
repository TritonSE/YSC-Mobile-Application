// Initial chessboard code credits go to William Candillon
// Github: https://github.com/wcandillon
// Source Code: https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Chess
import { Chess } from "chess.js";
import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

import Background from "./Background";
import Gameover from "./Gameover";
import Piece from "./Piece";

const { width } = Dimensions.get("window");

function useConst<T>(initialValue: T | (() => T)): T {
  const ref = useRef<{ value: T }>();
  if (ref.current === undefined) {
    // Box the value in an object so we can tell if it's initialized even if the initializer
    // returns/is undefined
    ref.current = {
      value:
        typeof initialValue === "function"
          ? // eslint-disable-next-line @typescript-eslint/ban-types
            (initialValue as Function)()
          : initialValue,
    };
  }
  return ref.current.value;
}

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },
});

const Board = () => {
  const chess = useConst(() => new Chess());
  const [state, setState] = useState({
    player: chess.turn(),
    board: chess.board(),
    fenString: "Game has not started",
    gameState: chess.game_over(),
  });

  // Updates game information after a turn
  const onTurn = useCallback(() => {
    setState({
      player: chess.turn(),
      board: chess.board(),
      fenString: chess.fen(),
      // Tracks the game state every turn
      gameState: chess.game_over(),
    });
  }, [chess, state.player]);

  return (
    <View>
      <Gameover isGameOver={state.gameState} playerWhoWon={state.player} />
      <Text style={{ color: "black" }}>{state.fenString}</Text>
      <View style={styles.container}>
        <Background />
        {state.board.map((row, y) =>
          row.map((piece, x) => {
            if (piece !== null) {
              return (
                /* eslint-disable react/no-array-index-key */
                <Piece
                  key={`${x}-${y}`}
                  id={`${piece.color}${piece.type}` as const}
                  startPosition={{ x, y }}
                  chess={chess}
                  onTurn={onTurn}
                  enabled={state.player === piece.color}
                />
                /* eslint-enable react/no-array-index-key */
              );
            }
            return null;
          })
        )}
      </View>
    </View>
  );
};

export default Board;

// Initial chessboard code credits go to William Candillon
// Github: https://github.com/wcandillon
// Source Code: https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Chess
import { Chess } from "chess.js";
import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

import Background from "./Background";
import Gameover from "./Gameover";
import Piece from "./Piece";

const reverseString = (str) => str.split('').reverse().join('')
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

// Reverses the fen string to align with the perspective of the opposing player
function reverseFenString (fen) {
  const trailingText = fen.split("/").slice(-1)[0].split(' ').slice(1).join(' ');
  const splitArray = fen.split("/").slice(0, -1).concat([fen.split("/").slice(-1)[0].split(' ')[0]])
  for (let i = 0; i < splitArray.length; i++) {
      splitArray[i] = reverseString(splitArray[i].split()[0]);
    }
  return splitArray.reverse().slice(0, -1).concat(splitArray.slice(-1) + ' ' + trailingText).join('/')
};

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
    reverseString: "Game has not started"
  });
  // Updates game information after a turn
  const onTurn = useCallback(() => {
    setState({
      player: chess.turn(),
      board: chess.board(),
      fenString: chess.fen(),
      gameState: chess.game_over(),
    });
  }, [chess, state.player]);
  return (
    <View>
      <Gameover isGameOver={state.gameState} playerWhoWon={state.player} />
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

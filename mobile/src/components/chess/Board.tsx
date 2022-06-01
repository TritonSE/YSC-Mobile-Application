// Initial chessboard code credits go to William Candillon
// Github: https://github.com/wcandillon
// Source Code: https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Chess
import { Chess } from "chess.js";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

import { SocketContext } from "../../contexts/SocketContext";

import Background from "./Background";
import Gameover from "./Gameover";
import Piece from "./Piece";
import { reverseFenString } from "./util";

const { width } = Dimensions.get("window");

interface BoardProps {
  color: string;
}

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

const Board = ({ color }: BoardProps) => {
  const socket = useContext(SocketContext);
  const chess = useConst(() => new Chess());

  const initChessState = {
    myColor: color,
    player: chess.turn(),
    board: chess.board(),
    fenString: "Game has not started",
    gameState: chess.game_over(),
    reverseString: "Game has not started",
  };
  const [state, setState] = useState(initChessState);

  // Updates game information after a turn
  const onTurn = useCallback(() => {
    setState({
      myColor: color,
      player: chess.turn(),
      board: chess.board(),
      fenString: chess.fen(),
      reverseString: reverseFenString(chess.fen()),
      gameState: chess.game_over(),
    });
  }, [chess, state.player]);

  useEffect(() => {
    socket.on("updated board", (fen: string) => {
      chess.load(fen);
      onTurn();
    });

    // reset state when component unmounts
    return () => {
      setState(initChessState);
    };
  }, []);

  return (
    <>
      <Gameover isGameOver={state.gameState} playerWhoWon={state.player} />
      <Text style={{ color: "black" }}>{state.fenString}</Text>
      <Text style={{ color: "black" }}>{state.reverseString}</Text>
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
                  enabled={state.player === piece.color && state.myColor === state.player}
                />
                /* eslint-enable react/no-array-index-key */
              );
            }
            return null;
          })
        )}
      </View>
    </>
  );
};

export default Board;

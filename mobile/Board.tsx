import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Chess } from "chess.js";

import Background from "./Background";
import Piece from "./Piece";
import Display from "./Display";

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
    player: "w",
    board: chess.board(),
    fenString : 'Game has not started'
  });
  // Sets the player color and sets the board to a certain state which is then
  // mapped
  const onTurn = useCallback(() => {
    setState({
      player: state.player === "w" ? "b" : "w",
      board: chess.board(),
      fenString: chess.fen(),
    });
  }, [chess, state.player]);
  return (
    <View>
        <Text style = {{color: 'azure'}}>{state.fenString}</Text>
        <View style={styles.container}>
            <Background />
            {state.board.map((row, y) =>
            row.map((piece, x) => {
                if (piece !== null) {
                return (
                    <Piece
                    key={`${x}-${y}`}
                    id={`${piece.color}${piece.type}` as const}
                    startPosition={{ x, y }}
                    chess={chess}
                    onTurn={onTurn}
                    enabled={state.player === piece.color}
                    />
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
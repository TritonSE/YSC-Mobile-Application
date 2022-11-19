// Initial chessboard code credits go to William Candillon
// Github: https://github.com/wcandillon
// Source Code: https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Chess
import { Chess } from "chess.js";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

import Background from "./Background";
import Gameover from "./Gameover";
import Piece from "./Piece";
import { reverseFenString } from "./util";

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
  turnContainer: {
    alignSelf: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  greenCircle: {
    width: 15,
    height: 15,
    marginLeft: 4,
    borderRadius: 8,
    backgroundColor: "#96C957",
  },
  emptyCircle: {
    width: 15,
    height: 15,
    marginLeft: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#C4C4C4",
  },
  text: {
    marginLeft: 5,
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "normal",
  },
});

const LessonBoard = ({ draw }) => {
  const chess = useConst(() => new Chess());

  const initChessState = {
    player: "w",
    board: chess.board(),
    fenString: "Game has not started",
    gameState: chess.game_over(),
    reverseString: "Game has not started",
  };
  const [state, setState] = useState(initChessState);

  const forceWhite = (oldFenString) => {
    let fenArray = oldFenString.split(" ");
    fenArray[1] = "w";
    let newFenString = "";
    for (let index = 0; index < fenArray.length; index++) {
      newFenString += fenArray[index];
      if (index != fenArray.length - 1) {
        newFenString += " ";
      }
    }
    return newFenString;
  }

  // Updates game information after a turn
  const onTurn = useCallback(() => {
    setState({
      player: "w",
      board: chess.board(),
      fenString: forceWhite(chess.fen()),
      reverseString: forceWhite(reverseFenString(chess.fen())),
      gameState: chess.game_over(),
    });
    chess.load(forceWhite(chess.fen()));
  }, [chess, state.player]);

  const getPlayerOutcome = () => {
    if (chess.in_checkmate()) {
      return state.player === state.myColor ? "loss" : "win";
    }
    return "draw";
  };

  return (
    <>
      <View>
        <Gameover isGameOver={state.gameState || draw} outcomeVar={getPlayerOutcome()} />
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
                    enabled={true}
                  />
                  /* eslint-enable react/no-array-index-key */
                );
              }
              return null;
            })
          )}
        </View>
      </View>
    </>
  );
};

export default LessonBoard;

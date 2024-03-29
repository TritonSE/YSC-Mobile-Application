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
import Promotion from "./Promotion";
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
    fontFamily: "Roboto",
  },
});

const Board = ({ color, players, draw, setDraw, disconnect, resign, forceFlip }) => {
  const socket = useContext(SocketContext);
  const chess = useConst(() => new Chess());

  const initChessState = {
    myColor: color,
    player: chess.turn(),
    board: chess.board(),
    fenString: "Game has not started",
    reverseString: "Game has not started",
    gameState: chess.game_over(),
    check: false,
  };
  const [state, setState] = useState(initChessState);

  // Updates game information after a turn
  const [moves, setMoves] = useState([]);
  const [focused, setFocused] = useState();
  const [promotionOpen, setPromotionOpen] = useState(false);
  const [hudData, setHudData] = useState({
    top: { name: "", turn: false },
    bottom: { name: "", turn: false },
  });
  const onTurn = useCallback(() => {
    setState({
      myColor: color,
      player: chess.turn(),
      board: chess.board(),
      fenString: chess.fen(),
      reverseString: reverseFenString(chess.fen()),
      gameState: chess.game_over(),
      check: chess.in_check() ? chess.turn() : false,
    });
    setMoves([]);
  }, [chess, state.player]);

  useEffect(() => {
    socket.on("updated board", (fen: string) => {
      chess.load(fen);
      onTurn();
      setDraw(false);
    });

    return () => socket.off("updated board");
  }, []);

  useEffect(() => {
    setMoves([]);
    setFocused();
  }, [forceFlip]);

  useEffect(() => {
    let curIndex = 0 + !!(state.myColor === "w");
    let curTurn = state.player === state.myColor;
    if (forceFlip !== undefined) {
      if (forceFlip) {
        curIndex = 0;
        curTurn = !curTurn;
      } else {
        curIndex = 1;
      }
    }
    setHudData({
      top: {
        name: players[curIndex],
        turn: !curTurn,
      },
      bottom: {
        name: players[1 - curIndex],
        turn: curTurn,
      },
    });
  }, [forceFlip, state.player]);

  return (
    <>
      {promotionOpen && (
        <Promotion
          color={color}
          setValue={(v) => {
            setPromotionOpen(false);
            chess.move({
              ...focused,
              promotion: v,
            });
            socket.emit("send chess move", chess.fen());
            chess.load(chess.fen());
            onTurn();
            setFocused();
          }}
        />
      )}

      <View>
        <Gameover chess={chess} state={state} draw={draw} disconnect={disconnect} resign={resign} />
        <View style={[styles.turnContainer, { marginBottom: 12 }]}>
          <View style={hudData.top.turn ? styles.greenCircle : styles.emptyCircle} />
          <Text style={styles.text}>{hudData.top.name}</Text>
        </View>
        <View style={styles.container}>
          <Background
            chess={chess}
            flip={forceFlip !== undefined ? forceFlip : state.myColor === "b"}
            moves={moves}
            onTurn={onTurn}
            onPromote={(move) => {
              setFocused(move);
              setPromotionOpen(true);
            }}
          />
          {state.board.map((row, y) =>
            row.map((piece, x) => {
              if (piece !== null) {
                return (
                  /* eslint-disable react/no-array-index-key */
                  <Piece
                    key={`${x}-${y}`}
                    id={`${piece.color}${piece.type}` as const}
                    startPosition={{ x, y }}
                    flip={forceFlip !== undefined ? forceFlip : state.myColor === "b"}
                    chess={chess}
                    check={state.check}
                    onTurn={onTurn}
                    onTap={() => {
                      if (state.player !== state.myColor) return;

                      const rank = "" + (8 - y);
                      const file = String.fromCharCode(97 + x);
                      const square = file + rank;
                      if (piece.color === state.myColor) {
                        setMoves(chess.moves({ square, verbose: true }));
                        setFocused({
                          from: square,
                        });
                      } else if (focused && focused.from) {
                        if (
                          (rank === "1" || rank === "8") &&
                          chess.get(focused.from)?.type === "p" &&
                          moves.find(({ to }) => to === square)
                        ) {
                          setFocused({
                            from: focused.from,
                            to: square,
                          });
                          setPromotionOpen(true);
                          return;
                        }
                        chess.move({
                          from: focused.from,
                          to: square,
                        });
                        socket.emit("send chess move", chess.fen());
                        chess.load(chess.fen());
                        onTurn();
                        setFocused();
                      }
                    }}
                    onPromote={(move) => {
                      setFocused(move);
                      setPromotionOpen(true);
                    }}
                    enabled={state.player === piece.color && state.myColor === state.player}
                  />
                  /* eslint-enable react/no-array-index-key */
                );
              }
              return null;
            })
          )}
        </View>
      </View>
      <View style={[styles.turnContainer, { marginTop: 12 }]}>
        <View style={hudData.bottom.turn ? styles.greenCircle : styles.emptyCircle} />
        <Text style={styles.text}>{hudData.bottom.name}</Text>
      </View>
    </>
  );
};

export default Board;

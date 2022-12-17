// Initial chessboard code credits go to William Candillon
// Github: https://github.com/wcandillon
// Source Code: https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Chess
import { useNavigation } from "@react-navigation/native";
import { Chess } from "chess.js";
import * as SecureStore from "expo-secure-store";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import LessonOverPopup from "../popups/LessonOverPopup";

import Background from "./Background";
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

const LessonBoard = ({ name, startFen, endFen }) => {
  const chess = useConst(() => new Chess(startFen));
  const navigation = useNavigation();

  const initChessState = {
    player: "w",
    myColor: "w",
    board: chess.board(),
    fenString: "Game has not started",
    reverseString: "Game has not started",
    lessonWon: false,
  };
  const [state, setState] = useState(initChessState);
  const [moves, setMoves] = useState([]);
  const [focused, setFocused] = useState();
  const [promotionOpen, setPromotionOpen] = useState(false);

  const forceWhite = (oldFenString) => {
    const fenArray = oldFenString.split(" ");
    fenArray[1] = "w";
    fenArray[3] = "-";
    let newFenString = "";
    for (let index = 0; index < fenArray.length; index++) {
      newFenString += fenArray[index];
      if (index !== fenArray.length - 1) {
        newFenString += " ";
      }
    }
    return newFenString;
  };

  const getPlayerOutcome = async (fenString) => {
    if (endFen.includes(fenString)) {
      try {
        const str = (await SecureStore.getItemAsync("lessonProgress")) ?? "{}";
        const progress = JSON.parse(str);
        progress[name] = 1;
        await SecureStore.setItemAsync("lessonProgress", JSON.stringify(progress));
        // eslint-disable-next-line no-empty
      } catch (e) {}
      state.lessonWon = true;
    }
  };

  // Updates game information after a turn
  const onTurn = useCallback(() => {
    const update = async () => {
      await getPlayerOutcome(forceWhite(chess.fen()));
      setState({
        player: "w",
        board: chess.board(),
        fenString: forceWhite(chess.fen()),
        reverseString: forceWhite(reverseFenString(chess.fen())),
        lessonWon: state.lessonWon,
      });
      setMoves([]);
    };
    update();
  }, [chess, state.player]);

  useEffect(() => {
    chess.load(state.fenString);
  }, [state.fenString]);

  const returnFunc = () => {
    state.lessonWon = false;
    navigation.navigate("LessonHomeScreen");
  };

  return (
    <>
      {promotionOpen && (
        <Promotion
          color="w"
          setValue={(v) => {
            setPromotionOpen(false);
            chess.move({
              ...focused,
              promotion: v,
            });
            chess.load(chess.fen());
            onTurn();
            setFocused();
          }}
        />
      )}

      <View>
        {state.lessonWon && <LessonOverPopup returnFunc={returnFunc} />}
        <View style={styles.container}>
          <Background
            chess={chess}
            moves={moves}
            onTurn={onTurn}
            offline
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
                    chess={chess}
                    check={state.check}
                    onTurn={onTurn}
                    onTap={() => {
                      const rank = "" + (8 - y);
                      const file = String.fromCharCode(97 + x);
                      const square = file + rank;
                      if (piece.color === state.player) {
                        setMoves(chess.moves({ square, verbose: true }));
                        setFocused({
                          from: square,
                        });
                      } else if (focused?.from) {
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
                        chess.load(chess.fen());
                        onTurn();
                        setFocused();
                      }
                    }}
                    onPromote={(move) => {
                      setFocused(move);
                      setPromotionOpen(true);
                    }}
                    enabled
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

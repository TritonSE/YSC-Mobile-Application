// Initial chessboard code credits go to William Candillon
// Github: https://github.com/wcandillon
// Source Code: https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Chess
import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { SocketContext } from "../../contexts/SocketContext";

const WHITE = "rgb(100, 133, 68)";
const BLACK = "rgb(230, 233, 198)";
const MOVE = "rgb(243, 206, 129)";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
});

function Square({ white, row, col, moves, chess, flip, onTurn, offline, onPromote }) {
  const backgroundColor = white ? WHITE : BLACK;
  const color = white ? BLACK : WHITE;
  const textStyle = { fontWeight: "500" as const, color };

  const socket = useContext(SocketContext);
  const [isValid, setIsValid] = useState(false);

  const rank = String.fromCharCode(97 + col);
  const file = "" + (8 - row);

  useEffect(() => setIsValid(moves.find(({ to }) => to === `${rank}${file}`)), [moves]);

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: isValid ? MOVE : backgroundColor,
        padding: 4,
        justifyContent: "space-between",
      }}
      onPress={() => {
        if (isValid) {
          if ((file === "1" || file === "8") && chess.get(isValid.from)?.type === "p" && onPromote)
            onPromote(isValid);
          else {
            chess.move(isValid);
            if (!offline) socket.emit("send chess move", chess.fen());
            chess.load(chess.fen());
            onTurn();
          }
        }
      }}
    >
      <Text style={[textStyle, { opacity: col === 7 * flip ? 1 : 0 }]}>{file}</Text>
      {row === 7 - flip * 7 && <Text style={[textStyle, { alignSelf: "flex-end" }]}>{rank}</Text>}
    </TouchableOpacity>
  );
}

function Row({ white, row, moves, flip, chess, onTurn, offline, onPromote }) {
  const offset = white ? 0 : 1;
  return (
    <View style={styles.container}>
      {/* eslint-disable react/no-array-index-key */}
      {new Array(8).fill(0).map((_, i) => (
        <Square
          row={row}
          col={flip ? 7 - i : i}
          key={i}
          white={(i + offset) % 2 === 1}
          moves={moves}
          chess={chess}
          flip={flip}
          onTurn={onTurn}
          offline={offline}
          onPromote={onPromote}
        />
      ))}
      {/* eslint-enable react/no-array-index-key */}
    </View>
  );
}

const Background = ({ flip, moves, chess, onTurn, offline, onPromote }) => (
  <View style={{ flex: 1 }}>
    {/* eslint-disable react/no-array-index-key */}
    {new Array(8).fill(0).map((_, i) => (
      <Row
        key={i}
        white={i % 2 === 0}
        row={flip ? 7 - i : i}
        moves={moves}
        flip={flip}
        chess={chess}
        onTurn={onTurn}
        offline={offline}
        onPromote={onPromote}
      />
    ))}
    {/* eslint-enable react/no-array-index-key */}
  </View>
);

export default Background;

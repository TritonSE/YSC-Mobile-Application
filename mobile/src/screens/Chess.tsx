// Initial chessboard code credits go to William Candillon
// Github: https://github.com/wcandillon
// Source Code: https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Chess
import React from "react";
import { View, StyleSheet } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import Board from "../components/chess/Board.tsx";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "grey",
  },
});

// Enable gestures to work for Android
const Chessboard = gestureHandlerRootHOC(() => (
  <View style={styles.container}>
    <Board />
  </View>
));

const Chess = () => {
  return <Chessboard />;
};

export default Chess;

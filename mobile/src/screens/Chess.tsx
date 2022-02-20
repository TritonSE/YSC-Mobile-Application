import React from "react";
import { View, StyleSheet } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import Board from "./components/Board.tsx";

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

function Chess() {
  return <Chessboard />;
}

export default Chess;

// Initial chessboard code credits go to William Candillon
// Github: https://github.com/wcandillon
// Source Code: https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Chess
import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import Board from "../components/chess/Board";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "grey",
  },
});

// Enable gestures to work for Android
const Chessboard = gestureHandlerRootHOC(() => {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <Board color={route.params.color} />
    </View>
  );
});

const Chess = () => <Chessboard />;

export default Chess;

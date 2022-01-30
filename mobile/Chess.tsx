import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Board from "./Board";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgb(36, 35, 32)",
  },
});

const Chess = () => {
  return (
    <View style={styles.container}>
      <Board />
    </View>
  );
};

export default Chess;
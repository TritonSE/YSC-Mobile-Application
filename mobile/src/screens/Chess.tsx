// Initial chessboard code credits go to William Candillon
// Github: https://github.com/wcandillon
// Source Code: https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Chess
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import Button from "../components/Button";
import Board from "../components/chess/Board";
import DrawPopup from "../components/popups/DrawPopup";
import { SocketContext } from "../contexts/SocketContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "grey",
  },
});

// Enable gestures to work for Android
const Chessboard = gestureHandlerRootHOC(() => {
  const socket = useContext(SocketContext);
  const navigation = useNavigation();
  const [openDraw, setOpenDraw] = useState(false);

  const proposeDraw = () => {
    socket.emit("try draw");
    console.log("proposing draw...");
  };

  socket.on("draw request", (username: string) => {
    console.log(username); // TODO: purpose of this? maybe display in popup
    setOpenDraw(true);
  });

  socket.on("game drawn", () => {
    navigation.navigate("HomeScreen");
  });

  socket.on("draw request rejected", () => {
    // TODO: popup?
    setOpenDraw(false);
  });

  return (
    <View style={styles.container}>
      <Board />
      <Button text="Draw" onPress={proposeDraw} />
      <DrawPopup activateIncorrectCredentialsPopup={openDraw} />
    </View>
  );
});

const Chess = () => <Chessboard />;

export default Chess;

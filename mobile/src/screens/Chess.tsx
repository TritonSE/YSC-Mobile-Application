// Initial chessboard code credits go to William Candillon
// Github: https://github.com/wcandillon
// Source Code: https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Chess
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import Button from "../components/Button";
import Board from "../components/chess/Board";
import OneButtonPopup from "../components/popups/popup_templates/OneButtonPopup";
import TwoButtonPopup from "../components/popups/popup_templates/TwoButtonPopup";
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
  const [openResign, setOpenResign] = useState(false);

  const proposeDraw = () => {
    socket.emit("try draw");
    console.log("proposing draw...");
  };

  const proposeResign = () => {
    socket.emit("resign");
    console.log("proposing resign...");
  }

  socket.on("draw request", () => {
    console.log(socket.id, " received a draw");
    setOpenDraw(true);
  });

  socket.on("game resigned", () => {
    console.log(socket.id, "opponent resigned");
    setOpenResign(true);
  });

  socket.on("game drawn", () => {
    navigation.navigate("HomeScreen");
  });

  socket.on("draw request rejected", () => {
    // TODO: popup?
    setOpenDraw(false);
  });

  const acceptDraw = () => {
    socket.emit("draw accepted");
  };

  const rejectDraw = () => {
    socket.emit("draw rejected");
    setOpenDraw(false); // TODO: state here and chess screen?
  };

  return (
    <View style={styles.container}>
      <Board />
      <Button text="Draw" onPress={proposeDraw} />
      {openDraw && (
        <TwoButtonPopup
          labelText={"Your Opponent Would \n Like A Draw. Accept or Decline?"}
          noFunc={rejectDraw}
          yesFunc={acceptDraw}
        />
      )}
      <Button text="Resign" onPress={proposeResign} />
      {openResign && (
        <OneButtonPopup
          labelText={'Your Opponent Had Resigned, You Win!'}
          buttonText={'Back to Homescreen'}
          buttonFunc={navigation.navigate("HomeScreen")}
        />
      )}
    </View>
  );
});

const Chess = () => <Chessboard />;

export default Chess;

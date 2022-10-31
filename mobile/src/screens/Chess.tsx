// Initial chessboard code credits go to William Candillon
// Github: https://github.com/wcandillon
// Source Code: https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Chess
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import Button from "../components/Button";
import Board from "../components/chess/Board";
import OneButtonPopup from "../components/popups/OneButtonPopup";
import TwoButtonPopup from "../components/popups/TwoButtonPopup";
import { SocketContext } from "../contexts/SocketContext";
import { AppStylesheet as styles } from "../styles/AppStylesheet";

// Enable gestures to work for Android
const Chessboard = gestureHandlerRootHOC(() => {
  const socket = useContext(SocketContext);
  const route = useRoute();
  const navigation = useNavigation();
  const [grayButton, setGrayButton] = useState(false);
  // states for popups rendering
  const [openDraw, setOpenDraw] = useState(false);
  const [openDrawRejected, setOpenDrawRejected] = useState(false);
  const [isDrawn, setIsDrawn] = useState(false);
  const [openResign, setOpenResign] = useState(false);
  const [isResigned, setIsResigned] = useState(false);

  const proposeDraw = () => {
    socket.emit("try draw");
    setGrayButton(true);
  };

  const acceptDraw = () => {
    socket.emit("draw accepted");
    setOpenDraw(false);
    setIsDrawn(true);
  };

  const rejectDraw = () => {
    socket.emit("draw rejected");
    setOpenDraw(false);
  };

  const initiateResign = () => {
    setOpenResign(true);
  };

  const rejectResign = () => {
    setOpenResign(false);
  };

  const acceptResign = () => {
    socket.emit("resign");
    setOpenResign(false);
    navigation.navigate("HomeScreen");
  };

  useEffect(() => {
    socket.on("draw request", () => {
      setOpenDraw(true);
    });

    socket.on("game drawn", () => {
      setIsDrawn(true);
      setGrayButton(false);
    });

    socket.on("draw request rejected", () => {
      setOpenDrawRejected(true);
      setGrayButton(false);
    });

    socket.on("game resigned", () => {
      setIsResigned(true);
    });

    return () => {
      socket.off("draw request");
      socket.off("game drawn");
      socket.off("draw request rejected");
      socket.off("game resigned");
    };
  }, []);

  return (
    <View style={styles.container}>
      <Board color={route.params.color} players={route.params.players} draw={isDrawn} />
      <View style={{ flexDirection: "row" }}>
        <Button
          text="Tie"
          onPress={grayButton ? undefined : proposeDraw}
          style={grayButton ? styles.grayButton : { width: 90 }}
        />
        <Button
          text="Quit"
          onPress={initiateResign}
          style={{ backgroundColor: "#dbedf9", width: 90, marginLeft: 20 }}
        />
      </View>
      {openDraw && (
        <TwoButtonPopup
          labelText={"Your Opponent Would \n Like A Draw. Accept or Decline?"}
          noFunc={rejectDraw}
          yesFunc={acceptDraw}
        />
      )}
      {openDrawRejected && (
        <OneButtonPopup
          labelText="Draw Request Declined"
          buttonText="Continue Game"
          buttonFunc={() => setOpenDrawRejected(false)}
        />
      )}
      {openResign && (
        <TwoButtonPopup
          labelText={"Are You Sure \n You'd Like To Quit?"}
          noFunc={rejectResign}
          yesFunc={acceptResign}
        />
      )}
      {isResigned && (
        <OneButtonPopup
          labelText="Your Opponent Has Resigned."
          buttonText="Return To Home"
          buttonFunc={() => navigation.navigate("HomeScreen")}
        />
      )}
    </View>
  );
});

const Chess = () => <Chessboard />;

export default Chess;

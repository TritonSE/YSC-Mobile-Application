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
  const navigation = useNavigation();
  const route = useRoute();
  const [grayButton, setGrayButton] = useState(false);
  // states for popups rendering
  const [openDraw, setOpenDraw] = useState(false);
  const [openDrawRejected, setOpenDrawRejected] = useState(false);
  const [openDrawAccepted, setOpenDrawAccepted] = useState(false);

  const proposeDraw = () => {
    socket.emit("try draw");
    setGrayButton(true);
  };

  const acceptDraw = () => {
    socket.emit("draw accepted");
    setOpenDraw(false);
    navigation.navigate("HomeScreen");
  };

  const rejectDraw = () => {
    socket.emit("draw rejected");
    setOpenDraw(false);
  };

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
  }, [navigation]);

  useEffect(() => {
    socket.on("draw request", () => {
      setOpenDraw(true);
    });

    socket.on("game drawn", () => {
      setOpenDrawAccepted(true);
      setGrayButton(false);
    });

    socket.on("draw request rejected", () => {
      setOpenDrawRejected(true);
      setGrayButton(false);
    });

    // reset states when component unmounts
    return () => {
      setGrayButton(false);
      setOpenDraw(false);
      setOpenDrawRejected(false);
      setOpenDrawAccepted(false);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Board color={route.params.color} />
      <Button
        text="Draw"
        onPress={grayButton ? undefined : proposeDraw}
        style={grayButton ? styles.grayButton : { width: 90 }}
      />
      {openDraw && (
        <TwoButtonPopup
          labelText={"Your Opponent Would \n Like A Draw. Accept or Decline?"}
          noFunc={rejectDraw}
          yesFunc={acceptDraw}
        />
      )}
      {openDrawAccepted && (
        <OneButtonPopup
          labelText="Draw Request Accepted"
          buttonText="Return Home"
          buttonFunc={() => navigation.navigate("HomeScreen")}
        />
      )}
      {openDrawRejected && (
        <OneButtonPopup
          labelText="Draw Request Declined"
          buttonText="Continue Game"
          buttonFunc={() => setOpenDrawRejected(false)}
        />
      )}
    </View>
  );
});

const Chess = () => <Chessboard />;

export default Chess;

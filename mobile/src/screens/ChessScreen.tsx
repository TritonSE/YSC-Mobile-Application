// Initial chessboard code credits go to William Candillon
// Github: https://github.com/wcandillon
// Source Code: https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Chess
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useRef, useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  Platform,
} from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import Button from "../components/Button";
import Board from "../components/chess/Board";
import OneButtonPopup from "../components/popups/OneButtonPopup";
import TwoButtonPopup from "../components/popups/TwoButtonPopup";
import { SocketContext } from "../contexts/SocketContext";
import { UserContext } from "../contexts/UserContext";
import { AppStylesheet as styles } from "../styles/AppStylesheet";

// This is one of the ugliest hacks I've ever had to write, but
//   something about this was not working within the gesture handler.
let chatLog = [];

// Enable gestures to work for Android
const Chessboard = gestureHandlerRootHOC(() => {
  const socket = useContext(SocketContext);
  const { userState } = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();
  const [grayButton, setGrayButton] = useState(false);
  // states for popups rendering
  const [openDraw, setOpenDraw] = useState(false);
  const [openDrawRejected, setOpenDrawRejected] = useState(false);
  const [isDrawn, setIsDrawn] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [openResign, setOpenResign] = useState(false);
  const [isResigned, setIsResigned] = useState(false);
  const [doFlip, setDoFlip] = useState();
  const [chatMsg, setChatMsg] = useState("");
  const scrollRef = useRef();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

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

  const sendChat = () => {
    if (chatMsg.trim() === "") return;

    socket.emit("send chat", chatMsg);
    setChatMsg("");
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

    socket.on("opponent disconnect", () => {
      setIsDisconnected(true);
    });

    socket.on("game resigned", () => {
      setIsResigned(true);
    });

    socket.on("chat message", (msg) => {
      chatLog.push(msg);
      forceUpdate();
      setTimeout(() => {
        // Yet another hack.
        scrollRef.current.scrollToEnd();
      }, 500);
    });

    return () => {
      socket.off("draw request");
      socket.off("game drawn");
      socket.off("draw request rejected");
      socket.off("opponent disconnect");
      socket.off("game resigned");
      socket.off("chat message");

      chatLog = [];
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, height: "100%" }}
      >
        <ScrollView
          style={{ flex: 1, height: "100%" }}
          contentContainerStyle={styles.container}
          scrollEnabled={false}
        >
          <Board
            color={route.params.color}
            players={route.params.players}
            draw={isDrawn}
            setDraw={setIsDrawn}
            disconnect={isDisconnected}
            resign={isResigned}
            forceFlip={userState.role !== "mentor" ? undefined : doFlip}
          />
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
            {userState.role === "mentor" && (
              <Button
                text="Flip"
                onPress={() => setDoFlip(!doFlip)}
                style={{ width: 90, marginLeft: 20 }}
              />
            )}
          </View>
          <ScrollView
            ref={scrollRef}
            style={{
              marginVertical: 10,
              paddingHorizontal: 10,
              flex: 3,
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: 20,
            }}
          >
            {chatLog.map(({ timestamp, sender, message }) => (
              <View
                key={timestamp + sender + message}
                style={{ flexDirection: "row", flexWrap: "wrap" }}
              >
                <Text style={{ fontFamily: "RobotoBold" }}>{sender}: </Text>
                <Text style={{ fontFamily: "Roboto" }}>{message}</Text>
              </View>
            ))}
          </ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, height: "100%" }}
          >
            <View style={styles.searchFlex}>
              <View style={styles.searchInput}>
                <TextInput
                  style={{ fontFamily: "Roboto", width: "88%" }}
                  onChangeText={(msg) => setChatMsg(msg.slice(0, 50))}
                  value={chatMsg}
                  onSubmitEditing={sendChat}
                  returnKeyType="send"
                  placeholder="Send a message..."
                  placeholderTextColor="#000"
                />
              </View>
            </View>
          </KeyboardAvoidingView>
          {openDraw && (
            <TwoButtonPopup
              labelText={"Your opponent would \n like a draw. Accept it?"}
              noFunc={rejectDraw}
              yesFunc={acceptDraw}
            />
          )}
          {openDrawRejected && (
            <OneButtonPopup
              labelText="Draw request declined."
              buttonText="Continue Game"
              buttonFunc={() => setOpenDrawRejected(false)}
            />
          )}
          {openResign && (
            <TwoButtonPopup
              labelText={"Are you sure \n you'd like to quit?"}
              noFunc={rejectResign}
              yesFunc={acceptResign}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});

const ChessScreen = () => <Chessboard />;

export default ChessScreen;

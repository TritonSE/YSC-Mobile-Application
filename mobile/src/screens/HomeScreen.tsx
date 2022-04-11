import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Text, View } from "react-native";

import Button from "../components/Button";
import { SocketContext } from "../contexts/SocketContext";
import { UserContext } from "../contexts/UserContext";
import { AppStylesheet } from "../styles/AppStylesheet";

const HomeScreen = () => {
  const { userState } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const navigation = useNavigation();

  const connectToGame = () => {
    socket.emit("assign to room");
    navigation.navigate("Chess");
  };

  return (
    <View style={AppStylesheet.container}>
      <Text style={AppStylesheet.headerHomeScreen}>Welcome, {userState.firstName}</Text>
      <Button text="Play Game" onPress={connectToGame} />
      <Text>14 Players Online</Text>
    </View>
  );
};

export default HomeScreen;

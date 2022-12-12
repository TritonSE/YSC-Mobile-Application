import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Text, View, Image } from "react-native";

import PlayIcon from "../../assets/play-icon.png";
import Button from "../components/Button";
import PlayersOnline from "../components/PlayersOnline";
import { SocketContext } from "../contexts/SocketContext";
import { UserContext } from "../contexts/UserContext";
import { AppStylesheet } from "../styles/AppStylesheet";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userState } = useContext(UserContext);
  const socket = useContext(SocketContext);

  const moveToLoading = () => {
    socket.emit("assign to room");
    navigation.navigate("SelectionScreen");
  };

  return (
    <View style={AppStylesheet.container}>
      <Text style={AppStylesheet.headerHomeScreen}>Welcome, {userState.firstName}</Text>
      <View>
        {userState.role === "student" && (
          <Button
            text="Play Game With A Mentor"
            image={<Image style={{ marginRight: "2%" }} source={PlayIcon} />}
            onPress={moveToLoading}
            style={{ flexDirection: "row", alignItems: "center" }}
          />
        )}
        <Button
          text="Play Game With A Student"
          image={<Image style={{ marginRight: "2%" }} source={PlayIcon} />}
          onPress={moveToLoading}
          style={{ flexDirection: "row", alignItems: "center" }}
        />
      </View>
      <PlayersOnline />
    </View>
  );
};

export default HomeScreen;

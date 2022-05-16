import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Text, View, Image } from "react-native";

import stemettImage from "../../assets/Stemett.png";
import Button from "../components/Button";
import TwoButtonPopup from "../components/popups/TwoButtonPopup";
import { SocketContext } from "../contexts/SocketContext";
import { UserContext } from "../contexts/UserContext";
import { AppStylesheet } from "../styles/AppStylesheet";

const LoadingScreen = () => {
  const navigation = useNavigation();
  const socket = useContext(SocketContext);
  const { userState } = useContext(UserContext);
  const [stopPopup, setStopPopup] = useState(false);
  let playerColor = "";

  const quitSearch = () => {
    navigation.navigate("HomeScreen");
    setStopPopup(false);
  };

  socket.once("successful assign", (color: string) => {
    playerColor = color;
  });
  socket.once("game ready", () => {
    navigation.navigate("Chess", { color: playerColor });
  });

  return (
    <View style={AppStylesheet.container}>
      <Text style={AppStylesheet.headerHomeScreen}>Welcome, {userState.firstName}</Text>
      <Image style={AppStylesheet.stemmettImage} source={stemettImage} />
      <Button text="Waiting for Opponent..." style={{ opacity: 0.5 }} />
      <Text style={{ fontSize: 18, marginTop: 5 }}>14 Players Online</Text>
      <Button
        text="Stop Searching"
        onPress={() => setStopPopup(true)}
        style={{ backgroundColor: "#DBEDF9", width: 164 }}
      />
      {stopPopup && (
        <TwoButtonPopup
          labelText={"Are You Sure \n You'd Like To Quit?"}
          yesFunc={quitSearch}
          noFunc={() => setStopPopup(false)}
        />
      )}
    </View>
  );
};
export default LoadingScreen;

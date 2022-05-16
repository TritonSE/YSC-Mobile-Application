import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Text, View, Image } from "react-native";

import Button from "../components/Button";
import { UserContext } from "../contexts/UserContext";
import { AppStylesheet } from "../styles/AppStylesheet";
import stemettImage from "../../assets/Stemett.png";

import { SocketContext } from "../contexts/SocketContext";



const LoadingScreen = () => {
    // basically same code as HomeScreen.tsx
    const navigation = useNavigation();
    const { userState } = useContext(UserContext);

    const socket = useContext(SocketContext);

    const connectToGame = () => {
      socket.once("successful assign", () => {
        navigation.navigate("Chess");
      });
    };

    return (
        <View style={AppStylesheet.container}>
          <Text style={AppStylesheet.headerHomeScreen}>Welcome, {userState.firstName}</Text>
          <Image style={AppStylesheet.mascot} source={stemettImage} />
          <Button text="Waiting for Opponent..." onPress={connectToGame}/>  
          {/* need to change the button so that it's opaque, and when we have the connection it goes to chess page */}
          <Text>14 Players Online</Text>
          <Button text = "Stop Searching"/>
        </View>
      );

}
export default LoadingScreen;
import React, { useContext } from "react";
import { Text, View } from "react-native";

import Button from "../components/Button";
import { UserContext } from "../contexts/UserContext";
import { AppStylesheet } from "../styles/AppStylesheet";

const HomeScreen = () => {
  const { userState } = useContext(UserContext);

  return (
    <View style={AppStylesheet.container}>
      <Text style={AppStylesheet.headerHomeScreen}>Welcome, {userState.firstName}</Text>
      <Button text="Play Game" />
      <Text>14 Players Online</Text>
    </View>
  );
};

export default HomeScreen;
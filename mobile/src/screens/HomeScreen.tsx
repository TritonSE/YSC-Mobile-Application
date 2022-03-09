import React from "react";
import { Text, View } from "react-native";

import Button from "../components/Button";
import { AppStylesheet } from "../styles/AppStylesheet";

const HomeScreen = () => (
  <View style={AppStylesheet.container}>
    <Text style={AppStylesheet.headerHomeScreen}>Welcome, User</Text>

    <Button text="Play Game With A Mentor" />
    <Button text="Play Game With A Student" />

    <Text>14 Players Online</Text>
  </View>
);

export default HomeScreen;

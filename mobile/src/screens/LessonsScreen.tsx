import React, { useContext } from "react";
import { Text, View } from "react-native";

import { UserContext } from "../contexts/UserContext";
import { AppStylesheet } from "../styles/AppStylesheet";

const LessonsScreen = () => {
  const { userState } = useContext(UserContext);

  return (
    <View style={AppStylesheet.container}>
      <Text style={AppStylesheet.headerHomeScreen}>Welcome, {userState.firstName}</Text>
      <Text style={{ fontSize: 18, marginTop: 16 }}>Lessons</Text>
    </View>
  );
};

export default LessonsScreen;

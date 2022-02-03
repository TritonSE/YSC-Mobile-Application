// import { StatusBar } from 'expo-status-bar';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View, Image } from "react-native";

import logoImg from "../../assets/YStemLogo1.png";

import { RootStackParamList } from "./RootStackParams";

type splashScreenProp = StackNavigationProp<RootStackParamList, "Splash Screen">;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  ystemLogo: {
    width: 327,
    height: 142,
  },
});

function SplashScreen() {
  const navigation = useNavigation<splashScreenProp>();

  setTimeout(() => {
    navigation.navigate("Login page");
  }, 5000);

  return (
    <View style={[{ backgroundColor: "#D4DDDD" }, styles.container]}>
      <Image style={styles.ystemLogo} source={logoImg} />
    </View>
  );
}

export default SplashScreen;

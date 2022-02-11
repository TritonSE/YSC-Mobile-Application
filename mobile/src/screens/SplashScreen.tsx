import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Image } from "react-native";

import logoImg from "../../assets/YStemLogo1.png";
import {AppStylesheet} from '../styles/AppStylesheet'

import { RootStackParamList } from "./RootStackParams";




type splashScreenProp = StackNavigationProp<RootStackParamList, "Splash Screen">;


function SplashScreen() {
  const navigation = useNavigation<splashScreenProp>();

  setTimeout(() => {
    navigation.navigate("Login page");
  }, 5000);

  return (
    <View style={AppStylesheet.containerSplashScreen}>
      <Image style={AppStylesheet.ystemLogo} source={logoImg} />
    </View>
  );
}

export default SplashScreen;

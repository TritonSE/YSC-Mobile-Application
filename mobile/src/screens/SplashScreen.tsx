import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Image } from "react-native";

import logoImg from "../../assets/YStemLogo1.png";
import {AppStylesheet} from '../styles/AppStylesheet'


const SplashScreen = () =>{
  const navigation = useNavigation();

  setTimeout(() => {
    navigation.navigate("Login");
  }, 5000);

  return (
    <View style={AppStylesheet.containerSplashScreen}>
      <Image style={AppStylesheet.yStemLogo} source={logoImg} />
    </View>
  );
}

export default SplashScreen;

import React from "react";
import { Text, View, Image } from "react-native";

import starImage from "../../assets/star.png";
import { AppStylesheet } from "../styles/AppStylesheet";

const LessonsScreen = () => (
  <View style={AppStylesheet.container}>
    {/* header portion with % bar */}
    {/* <Image style={AppStylesheet.stemmettImage} source={stemettImage} /> */}
    <Text style={AppStylesheet.headerHomeScreen}>Great Job!</Text>
    <Image style={AppStylesheet.starImage} source={starImage} />

    {/* grid with lessons */}
  </View>
);
export default LessonsScreen;

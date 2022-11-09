import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, Image } from "react-native";

// import stemettImage from "../../assets/Stemett.png";
import starImage from "../../assets/star.png";

import Button from "../components/Button";
import { AppStylesheet } from "../styles/AppStylesheet";

const LessonsPageScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={AppStylesheet.container}>
      {/* header portion with % bar */}
      {/* <Image style={AppStylesheet.stemmettImage} source={stemettImage} /> */}
      <Text style={AppStylesheet.headerHomeScreen}>Great Job!</Text>
      <Image style={AppStylesheet.starImage} source={starImage} />

      {/* grid with lessons */}

    </View>
  );
};
export default LessonsPageScreen;

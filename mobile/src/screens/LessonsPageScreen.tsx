import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, Image } from "react-native";

import stemettImage from "../../assets/Stemett.png";
import starImage from "../../assets/star.png";
import chessIcon from "../../assets/chess_icon.png";
import lessonsIcon from "../../assets/lessons_icon.png";

import Button from "../components/Button";
import { AppStylesheet } from "../styles/AppStylesheet";

const LessonsPageScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={AppStylesheet.container}>
      {/* header portion with % bar */}
      <Image style={AppStylesheet.stemmettImage} source={stemettImage} />
      <Text style={AppStylesheet.headerHomeScreen}>Great Job!</Text>
      <Text style={AppStylesheet.headerHomeScreen}>35% Levels Complete</Text>
      <Image style={AppStylesheet.starImage} source={starImage} />

      {/* grid with lessons */}
      <Button text="Waiting for Opponent..." style={{ opacity: 0.5 }} />
      <Text style={{ fontSize: 18, marginTop: 5 }}>14 Players Online</Text>

      {/* bottom tab */}
      <Image style={AppStylesheet.stemmettImage} source={chessIcon} />
      <Text style={AppStylesheet.headerHomeScreen}>Home</Text>
      <Image style={AppStylesheet.stemmettImage} source={lessonsIcon} />
      <Text style={AppStylesheet.headerHomeScreen}>Lessons</Text>

    </View>
  );
};
export default LessonsPageScreen;

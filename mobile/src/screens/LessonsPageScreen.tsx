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
      <View style={AppStylesheet.starImage}>
        <Image  source={starImage} />
      </View>
      {/* grid with lessons */}
      <View style={AppStylesheet.lessonContainer}>
        <View style={AppStylesheet.lessonSubContainer}>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 1</Text>
          </View>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 2</Text>
          </View>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 3</Text>
          </View>
        </View>
        <View style={AppStylesheet.lessonSubContainer}>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 4</Text>
          </View>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 5</Text>
          </View>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 6</Text>
          </View>
        </View>
        <View style={AppStylesheet.lessonSubContainer}>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 7</Text>
          </View>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 8</Text>
          </View>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 9</Text>
          </View>
        </View>
        <View style={AppStylesheet.lessonSubContainer}>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 10</Text>
          </View>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 11</Text>
          </View>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 12</Text>
          </View>
        </View>
        <View style={AppStylesheet.lessonSubContainer}>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 13</Text>
          </View>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 14</Text>
          </View>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 15</Text>
          </View>
        </View>
        <View style={AppStylesheet.lessonSubContainer}>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 16</Text>
          </View>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 17</Text>
          </View>
          <View style={AppStylesheet.lessonView}>
            <Text style={AppStylesheet.lessonText}>Lesson 18</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default LessonsPageScreen;

import React from "react";
import { Text, View, Image } from "react-native";

// import stemettImage from "../../assets/Stemett.png";
import starImage from "../../assets/star.png";
import mascotImage from "../../assets/mascot_stemett.png";
import progressBarImage from "../../assets/progress-bar.png";
import Button from "../components/Button";
import { AppStylesheet } from "../styles/AppStylesheet";

const LessonsPageScreen = () => {

  return (
    <View style={AppStylesheet.container}>
      {/* header portion with % bar */}
      {/* <Image style={AppStylesheet.stemmettImage} source={stemettImage} /> */}
      <View style={AppStylesheet.lessonHeader}>
        <Image source={mascotImage}/>
        <View style={{flex: 1}}>
          <View style={{flexDirection: "row"}}>
            <View style={{justifyContent: 'center'}}>
              <Text style={AppStylesheet.lessonHeaderText}>Great Job!</Text>
              <Text style={AppStylesheet.lessonHeaderText}>35% Levels Complete</Text>
            </View>
            <View style={AppStylesheet.starImage}>
              <Image  source={starImage} />
            </View>
          </View>
          <Image source={progressBarImage} style={{width: 290, height: 40, resizeMode: "cover"}}/>
        </View>
      </View>
      {/* grid with lessons */}
      <View style={AppStylesheet.lessonContainer}>
        <View style={AppStylesheet.lessonSubContainer}>
          <Button 
            text="Lesson 1"
            style={AppStylesheet.lessonView}
          />
          <Button 
            text="Lesson 2"
            style={AppStylesheet.lessonView}
          />
          <Button 
            text="Lesson 3"
            style={AppStylesheet.lessonView}
          />
        </View>
        <View style={AppStylesheet.lessonSubContainer}>
          <Button 
            text="Lesson 4"
            style={AppStylesheet.lessonView}
          />
          <Button 
            text="Lesson 5"
            style={AppStylesheet.lessonView}
          />
          <Button 
            text="Lesson 6"
            style={AppStylesheet.lessonView}
          />
        </View>
        <View style={AppStylesheet.lessonSubContainer}>
          <Button 
            text="Lesson 7"
            style={AppStylesheet.lessonView}
          />
          <Button 
            text="Lesson 8"
            style={AppStylesheet.lessonView}
          />
          <Button 
            text="Lesson 9"
            style={AppStylesheet.lessonView}
          />
        </View>
        <View style={AppStylesheet.lessonSubContainer}>
          <Button 
            text="Lesson 10"
            style={AppStylesheet.lessonView}
          />
          <Button 
            text="Lesson 11"
            style={AppStylesheet.lessonView}
          />
          <Button 
            text="Lesson 12"
            style={AppStylesheet.lessonView}
          />
        </View>
        <View style={AppStylesheet.lessonSubContainer}>
          <Button 
            text="Lesson 13"
            style={AppStylesheet.lessonView}
          />
          <Button 
            text="Lesson 14"
            style={AppStylesheet.lessonView}
          />
          <Button 
            text="Lesson 15"
            style={AppStylesheet.lessonView}
          />
        </View>
        <View style={AppStylesheet.lessonSubContainer}>
          <Button 
            text="Lesson 16"
            style={AppStylesheet.lessonView}
          />
          <Button 
            text="Lesson 17"
            style={AppStylesheet.lessonView}
          />
          <Button 
            text="Lesson 18"
            style={AppStylesheet.lessonView}
          />
        </View>
      </View>
    </View>
  );
};
export default LessonsPageScreen;

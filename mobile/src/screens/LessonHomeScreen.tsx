import { useNavigation, useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, SafeAreaView } from "react-native";

import lockImage from "../../assets/icons/lock.png";
import starImage from "../../assets/icons/star.png";
import mascotImage from "../../assets/mascots/mascot_stemett.png";
import Button from "../components/Button";
import lessons from "../const/lessons";
import { AppStylesheet } from "../styles/AppStylesheet";

const LessonHomeScreen = () => {
  const navigation = useNavigation();
  const [lessonsState, setLessonsState] = useState([]);
  const [totalProgress, setTotalProgress] = useState("0%");
  const isFocused = useIsFocused();

  const lessonStyles = [{}, AppStylesheet.lessonViewCompleted, AppStylesheet.lessonViewLocked];
  const lessonImages = [
    null,
    <Image
      source={starImage}
      style={{ width: 20, height: 20, position: "relative", left: 45, top: 45 }}
    />,
    <Image
      source={lockImage}
      style={{ width: 20, height: 20, position: "relative", left: 45, top: 45 }}
    />,
  ];

  const moveToLesson = (name) => {
    navigation.navigate("LessonScreen", {
      name,
      startString: lessons[name].start,
      endString: lessons[name].end,
    });
  };

  useEffect(() => {
    if (!isFocused) return;

    const loadProgress = async () => {
      const out = [[]];
      let tot = 0;
      let complete = 0;

      let i = 0;
      Object.keys(lessons).forEach((id) => {
        if (out[i].length === 3) {
          out[++i] = [];
        }

        out[i].push({
          name: id,
          state: 0,
          unlocked_by: lessons[id].unlocked_by,
        });
      });

      try {
        const str = (await SecureStore.getItemAsync("lessonProgress")) ?? "{}";
        const progress = JSON.parse(str);
        out.forEach((arr) => {
          arr.forEach((lesson) => {
            tot++;
            lesson.state = progress[lesson.name] ?? 0;

            if (lesson.state === 1) {
              complete++;
              return;
            }

            if (lesson.unlocked_by) {
              for (let j = 0; j < lesson.unlocked_by.length; j++) {
                if (!progress[lesson.unlocked_by[j]]) {
                  lesson.state = 2;
                  break;
                }
              }
            }
          });
        });
        // eslint-disable-next-line no-empty
      } catch (e) {}

      setLessonsState(out);
      setTotalProgress(Math.round((100 * complete) / (tot || 1)) + "%");
    };
    loadProgress();
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {/* header portion with % bar */}
        {/* <Image style={AppStylesheet.stemmettImage} source={stemettImage} /> */}
        <View style={AppStylesheet.lessonHeader}>
          <Image source={mascotImage} />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "center" }}>
                <Text style={AppStylesheet.lessonHeaderText}>Great Job!</Text>
                <Text style={AppStylesheet.lessonHeaderText}>
                  {totalProgress} of Lessons Complete
                </Text>
              </View>
              <View style={AppStylesheet.starImage}>
                <Image source={starImage} />
              </View>
            </View>
            <View style={AppStylesheet.lessonProgressOuter}>
              <View style={[AppStylesheet.lessonProgressInner, { width: totalProgress }]} />
            </View>
          </View>
        </View>
        {/* grid with lessons */}
        <View style={AppStylesheet.lessonContainer}>
          {lessonsState.map((arr) => (
            <View key={JSON.stringify(arr)} style={AppStylesheet.lessonSubContainer}>
              {arr.map(({ name, state }) => (
                <Button
                  key={name}
                  text={name + (state === 0 ? "" : "\n")}
                  image={lessonImages[state]}
                  style={[AppStylesheet.lessonView, lessonStyles[state]]}
                  onPress={() => {
                    if (state < 2) moveToLesson(name);
                  }}
                />
              ))}
            </View>
          ))}
          {/*
          <View style={AppStylesheet.lessonSubContainer}>
            <Button
              text="Lesson 1"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(0)}
            />
            <Button
              text="Lesson 2"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(1)}
            />
            <Button
              text="Lesson 3"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(2)}
            />
          </View>
          <View style={AppStylesheet.lessonSubContainer}>
            <Button
              text="Lesson 4"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(0)}
            />
            <Button
              text="Lesson 5"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(1)}
            />
            <Button
              text="Lesson 6"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(2)}
            />
          </View>
          <View style={AppStylesheet.lessonSubContainer}>
            <Button
              text="Lesson 7"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(0)}
            />
            <Button
              text="Lesson 8"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(1)}
            />
            <Button
              text="Lesson 9"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(2)}
            />
          </View>
          <View style={AppStylesheet.lessonSubContainer}>
            <Button
              text="Lesson 10"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(0)}
            />
            <Button
              text="Lesson 11"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(1)}
            />
            <Button
              text="Lesson 12"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(2)}
            />
          </View>
          <View style={AppStylesheet.lessonSubContainer}>
            <Button
              text="Lesson 13"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(0)}
            />
            <Button
              text="Lesson 14"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(1)}
            />
            <Button
              text="Lesson 15"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(2)}
            />
          </View>
          <View style={AppStylesheet.lessonSubContainer}>
            <Button
              text="Lesson 16"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(0)}
            />
            <Button
              text="Lesson 17"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(1)}
            />
            <Button
              text="Lesson 18"
              style={AppStylesheet.lessonView}
              onPress={() => moveToLesson(2)}
            />
          </View>
          */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LessonHomeScreen;

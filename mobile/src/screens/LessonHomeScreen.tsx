import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, ScrollView, SafeAreaView } from "react-native";

import lockImage from "../../assets/icons/lock.png";
import starImage from "../../assets/icons/star.png";
import mascotImage from "../../assets/mascots/mascot_stemett.png";
import Button from "../components/Button";
import lessons from "../const/lessons";
import { SocketContext } from "../contexts/SocketContext";
import { UserContext } from "../contexts/UserContext";
import { AppStylesheet } from "../styles/AppStylesheet";

const LessonHomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const socket = useContext(SocketContext);
  const { userState } = useContext(UserContext);
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
    });
  };

  useEffect(() => {
    const setFromResponse = (progress) => {
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

      out.forEach((arr) => {
        arr.forEach((lesson) => {
          tot++;
          lesson.state = 0 + !!(progress[lesson.name] ?? 0);

          if (lesson.state === 1) {
            complete++;
            return;
          }

          if (lesson.unlocked_by) {
            for (let j = 0; j < lesson.unlocked_by.length; j++) {
              if (progress[lesson.unlocked_by[j]] !== true) {
                lesson.state = 2;
                break;
              }
            }
          }
        });
      });

      setLessonsState(out);
      setTotalProgress(Math.round((100 * complete) / (tot || 1)) + "%");
    };

    if (userState.role === "mentor") {
      setFromResponse(route.params.progress);
    }
    socket.on("send progress", ({ status: progress }) => setFromResponse(progress));

    return () => {
      socket.off("send progress");
    };
  }, []);

  useEffect(() => {
    if (!isFocused) return;

    if (userState.role === "student") socket.emit("request progress");
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
                {userState.role === "mentor" ? (
                  <Text style={[AppStylesheet.lessonHeaderText, { fontFamily: "RobotoBold" }]}>
                    {route.params.username}:
                  </Text>
                ) : (
                  <Text style={AppStylesheet.lessonHeaderText}>Great Job!</Text>
                )}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LessonHomeScreen;

// Initial chessboard code credits go to William Candillon
// Github: https://github.com/wcandillon
// Source Code: https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Chess
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import Button from "../components/Button";
import LessonBoard from "../components/chess/LessonBoard";
import TwoButtonPopup from "../components/popups/TwoButtonPopup";
import { AppStylesheet as styles } from "../styles/AppStylesheet";

// Enable gestures to work for Android
const Chessboard = gestureHandlerRootHOC(() => {
  const route = useRoute();
  const navigation = useNavigation();
  // states for popups rendering
  const [openResign, setOpenResign] = useState(false);

  const name = route.params.name;
  const startString = route.params.startString;
  const endString = route.params.endString;

  const initiateReturn = () => {
    setOpenResign(true);
  };

  const rejectReturn = () => {
    setOpenResign(false);
  };

  const acceptReturn = () => {
    setOpenResign(false);
    navigation.navigate("LessonHomeScreen");
  };

  return (
    <View style={styles.container}>
      <LessonBoard name={name} startFen={startString} endFen={endString} />
      <View style={{ flexDirection: "row" }}>
        <Button text="End Lesson" onPress={initiateReturn} style={{ width: 150 }} />
      </View>
      {openResign && (
        <TwoButtonPopup
          labelText={"Are you sure you'd like to \n return to the lessons page?"}
          noFunc={rejectReturn}
          yesFunc={acceptReturn}
        />
      )}
    </View>
  );
});

const Lesson = () => <Chessboard />;

export default Lesson;

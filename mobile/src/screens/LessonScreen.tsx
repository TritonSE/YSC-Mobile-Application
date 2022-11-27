// Initial chessboard code credits go to William Candillon
// Github: https://github.com/wcandillon
// Source Code: https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Chess
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
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

  const startString = "8/3p4/2p5/3p4/4P3/8/8/8 w - - 0 1";
  const endString = "8/3P4/8/8/8/8/8/8 w - - 0 1"

  const initiateReturn = () => {
    setOpenResign(true);
  };

  const rejectReturn = () => {
    setOpenResign(false);
  };

  const acceptReturn = () => {
    setOpenResign(false);
    navigation.navigate("LessonsHomePage");
  };

  return (
    <View style={styles.container}>
      <LessonBoard  startFen={startString} endFen={endString}/>
      <View style={{ flexDirection: "row" }}>
        <Button
          text="Go Back"
          onPress={initiateReturn}
          style={{  backgroundColor: "#96C957", width: 150 }}
        />
      </View>
      {openResign && (
        <TwoButtonPopup
          labelText={"Are You Sure You'd Like To \n Return to the Lessons Page?"}
          noFunc={rejectReturn}
          yesFunc={acceptReturn}
        />
      )}
    </View>
  );
});

const Lesson = () => <Chessboard />;

export default Lesson;

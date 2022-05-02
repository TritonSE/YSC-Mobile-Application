import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import OneButtonPopup from "./popup_templates/OneButtonPopup";

const ResignPopup = ({ activateResignPopup }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  if (activateResignPopup) {
    setModalVisible(true);
  }

  return (
    <View>
      {modalVisible && (
        <OneButtonPopup
          labelText="Your Opponent Has Resigned."
          buttonText="Return To Home"
          buttonFunc={() => navigation.navigate("HomeScreen")}
        />
      )}
    </View>
  );
};

export default ResignPopup;

import React, { useState } from "react";
import { View } from "react-native";

import OneButtonPopup from "./popup_templates/OneButtonPopup";

const ResignPopup = ({ activateResignPopup }) => {
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
          buttonFunc={() => console.log("Return home")}
        />
      )}
    </View>
  );
};

export default ResignPopup;

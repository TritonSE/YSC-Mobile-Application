import React, { useState } from "react";
import { View } from "react-native";

import TwoButtonPopup from "./popup_templates/TwoButtonPopup";

const QuitPopup = ({ activateQuitPopup }) => {
  const [modalVisible, setModalVisible] = useState(true); // disable to false?
  if (activateQuitPopup) {
    setModalVisible(true);
  }
  return (
    <View>
      {modalVisible && (
        <TwoButtonPopup
          labelText={"Are You Sure \n You'd Like to Quit?"}
          noFunc={() => console.log("No quit")}
          yesFunc={() => console.log("Yes quit")}
        />
      )}
    </View>
  );
};

export default QuitPopup;

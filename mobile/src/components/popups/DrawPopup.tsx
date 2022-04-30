import React, { useState } from "react";
import { View } from "react-native";

import TwoButtonPopup from "./popup_templates/TwoButtonPopup";

const DrawPopup = ({ activateDrawPopup }) => {
  const [modalVisible, setModalVisible] = useState(true); // disable to false?
  if (activateDrawPopup) {
    setModalVisible(true);
  }
  return (
    <View>
      {modalVisible && (
        <TwoButtonPopup
          labelText={"Your Opponent Would \n Like A Draw. Accept or Decline?"}
          noFunc={() => console.log("No draw")}
          yesFunc={() => console.log("Yes draw")}
        />
      )}
    </View>
  );
};

export default DrawPopup;

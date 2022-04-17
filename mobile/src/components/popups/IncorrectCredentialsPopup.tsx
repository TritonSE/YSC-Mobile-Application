import React, { useState } from "react";
import { View } from "react-native";

import TwoButtonPopup from "./popup_templates/TwoButtonPopup";

const IncorrectCredentialsPopup = ({ activateIncorrectCredentialsPopup }) => {
  const [modalVisible, setModalVisible] = useState(true); // disable to false?
  if (activateIncorrectCredentialsPopup) {
    setModalVisible(true);
  }
  return (
    <View>
      {modalVisible && (
        <TwoButtonPopup
          labelText={"Login Credentials Incorrect. \n Reset your Password?"}
          noFunc={() => console.log("No reset")}
          yesFunc={() => console.log("Yes reset")}
        />
      )}
    </View>
  );
};

export default IncorrectCredentialsPopup;

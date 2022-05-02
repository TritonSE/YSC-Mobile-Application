import React, { useState } from "react";
import { View } from "react-native";

import OneButtonPopup from "./popup_templates/OneButtonPopup";

const EmailPopup = ({ activateEmailPopup }) => {
  const [modalVisible, setModalVisible] = useState(true); // disable to false?
  if (activateEmailPopup) {
    setModalVisible(true);
  }

  return (
    <View>
      {modalVisible && (
        <OneButtonPopup
          labelText="Email Sent."
          buttonText="Login"
          buttonFunc={() => console.log("Email sent")}
        />
      )}
    </View>
  );
};

export default EmailPopup;

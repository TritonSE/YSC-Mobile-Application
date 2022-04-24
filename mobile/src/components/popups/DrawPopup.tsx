import React, { useState, useContext } from "react";
import { View } from "react-native";

import { SocketContext } from "../../contexts/SocketContext";

import TwoButtonPopup from "./popup_templates/TwoButtonPopup";

interface DrawPopupProps {
  activateIncorrectCredentialsPopup: boolean;
}

const DrawPopup = ({ activateIncorrectCredentialsPopup }: DrawPopupProps) => {
  const socket = useContext(SocketContext);
  const [modalVisible, setModalVisible] = useState(activateIncorrectCredentialsPopup); // disable to false?

  const acceptDraw = () => {
    socket.emit("draw accepted");
  };

  const rejectDraw = () => {
    socket.emit("draw rejected");
    setModalVisible(false); // TODO: state here and chess screen?
  };

  return (
    <View>
      {modalVisible && (
        <TwoButtonPopup
          labelText={"Your Opponent Would \n Like A Draw. Accept or Decline?"}
          noFunc={acceptDraw}
          yesFunc={rejectDraw}
        />
      )}
    </View>
  );
};

export default DrawPopup;

import { Alert, Modal, Text, Pressable, View } from "react-native";

import { AppStylesheet } from "../../../styles/AppStylesheet";

const OneButtonPopup = ({ labelText, buttonText, buttonFunc }) => (
  <View style={AppStylesheet.centeredView}>
    <Modal
      animationType="slide"
      transparent
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={AppStylesheet.centeredView}>
        <View style={AppStylesheet.modalView}>
          <Text style={AppStylesheet.modalText}>{labelText}</Text>
          <View style={AppStylesheet.buttonContainer}>
            {buttonText === "Return To Home" ? (
              <Pressable
                style={[AppStylesheet.modalButton, { width: 150, marginTop: 40 }]}
                onPress={buttonFunc}
              >
                <Text style={AppStylesheet.buttonText}>{buttonText}</Text>
              </Pressable>
            ) : (
              <Pressable
                style={[AppStylesheet.modalButton, { width: 100, marginTop: 40 }]}
                onPress={buttonFunc}
              >
                <Text style={AppStylesheet.buttonText}>{buttonText}</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  </View>
);

export default OneButtonPopup;

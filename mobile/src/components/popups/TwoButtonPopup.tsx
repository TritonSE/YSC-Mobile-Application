import { Alert, Modal, Text, Pressable, View } from "react-native";

import { AppStylesheet } from "../../styles/AppStylesheet";

interface TwoButtonPopupProps {
  labelText: string;
  noFunc: () => void;
  yesFunc: () => void;
}

// Pass in as props the button's label text, and what the button does when no and yes are pressed
const TwoButtonPopup = ({ labelText, noFunc, yesFunc }: TwoButtonPopupProps) => (
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
          <Pressable
            style={[AppStylesheet.modalButton, { backgroundColor: "#dbedf9" }]}
            onPress={noFunc}
          >
            <Text style={AppStylesheet.buttonText}>No</Text>
          </Pressable>
          <Pressable style={AppStylesheet.modalButton} onPress={yesFunc}>
            <Text style={AppStylesheet.buttonText}>Yes</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);

export default TwoButtonPopup;

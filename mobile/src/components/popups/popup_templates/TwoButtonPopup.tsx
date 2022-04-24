import { Alert, Modal, Text, Pressable, View } from "react-native";

import { AppStylesheet } from "../../../styles/AppStylesheet";

interface TwoButtonPopupProps {
  labelText: string;
  noFunc: () => void;
  yesFunc: () => void;
}

const TwoButtonPopup = ({ labelText, noFunc, yesFunc }: TwoButtonPopupProps) => (
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
  </View>
);

export default TwoButtonPopup;

import { Modal, Text, Pressable, View } from "react-native";

import { AppStylesheet } from "../../styles/AppStylesheet";
import { PopupStyleSheet } from "../../styles/PopupStylesheet";

interface TwoButtonPopupProps {
  labelText: string;
  noFunc: () => void;
  yesFunc: () => void;
}

// Pass in as props the button's label text, and what the button does when no and yes are pressed
const TwoButtonPopup = ({ labelText, noFunc, yesFunc }: TwoButtonPopupProps) => (
  <Modal animationType="slide" transparent>
    <View style={PopupStyleSheet.centeredView}>
      <View style={PopupStyleSheet.modalView}>
        <Text style={PopupStyleSheet.modalText}>{labelText}</Text>
        <View style={PopupStyleSheet.buttonContainer}>
          <Pressable
            style={[PopupStyleSheet.modalButton, { backgroundColor: "#dbedf9" }]}
            onPress={noFunc}
          >
            <Text style={AppStylesheet.buttonText}>No</Text>
          </Pressable>
          <Pressable style={PopupStyleSheet.modalButton} onPress={yesFunc}>
            <Text style={AppStylesheet.buttonText}>Yes</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);

export default TwoButtonPopup;

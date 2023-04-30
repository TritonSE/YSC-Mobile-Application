import { Modal, Text, Pressable, View } from "react-native";

import { AppStylesheet } from "../../styles/AppStylesheet";
import { PopupStyleSheet } from "../../styles/PopupStylesheet";

interface OneButtonPopupProps {
  labelText: string;
  buttonText: string;
  buttonFunc: () => void;
  popupStyle: object | undefined;
}

// Pass in as props the button's label text, button text, and what the button does when pressed
const OneButtonPopup = ({ labelText, buttonText, buttonFunc, popupStyle }: OneButtonPopupProps) => (
  <Modal animationType="slide" transparent>
    <View style={PopupStyleSheet.centeredView}>
      <View style={[PopupStyleSheet.modalView, popupStyle ?? {}]}>
        <Text style={PopupStyleSheet.modalText}>{labelText}</Text>
        <View style={PopupStyleSheet.buttonContainer}>
          {buttonText.length > 10 ? (
            <Pressable
              style={[PopupStyleSheet.modalButton, { width: 150, marginTop: 40 }]}
              onPress={buttonFunc}
            >
              <Text style={AppStylesheet.buttonText}>{buttonText}</Text>
            </Pressable>
          ) : (
            <Pressable
              style={[PopupStyleSheet.modalButton, { width: 100, marginTop: 40 }]}
              onPress={buttonFunc}
            >
              <Text style={AppStylesheet.buttonText}>{buttonText}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  </Modal>
);

export default OneButtonPopup;

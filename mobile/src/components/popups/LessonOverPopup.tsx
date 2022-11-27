import { Modal, Text, Pressable, View, ImageBackground, Image } from "react-native";

import balloons from "../../../assets/balloon_background.png";
import winMascot from "../../../assets/mascot_waving.png";
import { AppStylesheet } from "../../styles/AppStylesheet";
import { PopupStyleSheet } from "../../styles/PopupStylesheet";

// Pass in as props the button's label text, and what the button does when no and yes are pressed
const LessonOverPopup = ( returnFunc ) => {

  return (
    <Modal animationType="slide" transparent>
      <View style={[PopupStyleSheet.centeredView, { backgroundColor: "rgba(0, 0, 0, 0.25)" }]}>
        <View style={PopupStyleSheet.containerView}>
          <View style={PopupStyleSheet.imageContainerView}>
            <ImageBackground source={balloons} style={PopupStyleSheet.balloonView}>
              <View style={PopupStyleSheet.imageRow}>
                <Image key={winMascot} source={winMascot} style={PopupStyleSheet.mascotView} />
              </View>
              <Text style={PopupStyleSheet.gameOverText}>Great Work, You Did It!</Text>
            </ImageBackground>
          </View>
          <View style={PopupStyleSheet.buttonContainer}>
            <Pressable
              style={[PopupStyleSheet.modalButton, { width: 100, marginTop: 40 }]}
              onPress={returnFunc}
            >
              <Text style={AppStylesheet.buttonText}>Return Home</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LessonOverPopup;

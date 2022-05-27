import { Modal, Text, Pressable, View, ImageBackground, PointPropType } from "react-native";

import balloons from "../../../assets/balloon_background.png";
import confetti from "../../../assets/balloon_confetti.png";
import { AppStylesheet } from "../../styles/AppStylesheet";
import { PopupStyleSheet } from "../../styles/PopupStylesheet";

interface GameOverPopupProps {
  labelText: string;
  noFunc: () => void;
  yesFunc: () => void;
}

// Pass in as props the button's label text, and what the button does when no and yes are pressed
const GameOverPopup = ({ labelText, mascot, noFunc, yesFunc }: GameOverPopupProps) => (
  <Modal animationType="slide" transparent>
    <View style={PopupStyleSheet.centeredView}>
      <View style={PopupStyleSheet.containerView}>
        <View style={PopupStyleSheet.imageContainerView}>
          <ImageBackground source={confetti} style={PopupStyleSheet.confettiView}>
            <ImageBackground source={balloons} style={PopupStyleSheet.balloonView}>
              <ImageBackground source={mascot} style={PopupStyleSheet.mascotView}/>
              <Text style={PopupStyleSheet.gameOverText}>{labelText}</Text>
            </ImageBackground>
          </ImageBackground>
        </View>
        <View style={PopupStyleSheet.buttonContainer}>
          <Pressable
            style={PopupStyleSheet.modalButton}
            onPress={noFunc}
          >
            <Text style={AppStylesheet.buttonText}>Rematch</Text>
          </Pressable>
          <Pressable style={[PopupStyleSheet.modalButton, {backgroundColor: "#dbedf9" }]} onPress={yesFunc}>
            <Text style={AppStylesheet.buttonText}>Return Home</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);

export default GameOverPopup;

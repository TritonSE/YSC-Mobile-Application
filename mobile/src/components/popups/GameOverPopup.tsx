import { Modal, Text, Pressable, View, ImageBackground, Image } from "react-native";

import balloons from "../../../assets/balloon_background.png";
import confetti from "../../../assets/balloon_confetti.png";
import loseMascot from "../../../assets/mascot.png";
import winMascot from "../../../assets/mascot_waving.png";
import { AppStylesheet } from "../../styles/AppStylesheet";
import { PopupStyleSheet } from "../../styles/PopupStylesheet";

interface GameOverPopupProps {
  outcomeVar: string;
  noFunc: () => void;
  yesFunc: () => void;
}

const ImageObj = {
  win: <Image source={winMascot} style={PopupStyleSheet.mascotView} />,
  loss: <Image source={loseMascot} style={PopupStyleSheet.mascotView} />,

  // To be implemented later
  draw: <View />,
};

const TextObj = {
  win: <Text style={PopupStyleSheet.gameOverText}>Great Work, You Win!</Text>,
  loss: <Text style={PopupStyleSheet.gameOverText}>Good Effort, Try Again!</Text>,

  // To be implemented later
  draw: <View />,
};

function ImageOption({ state }: any) {
  return (
    <View style={PopupStyleSheet.enumView}>
      {ImageObj[state]}
      {TextObj[state]}
    </View>
  );
}

// Pass in as props the button's label text, and what the button does when no and yes are pressed
const GameOverPopup = ({ outcomeVar, noFunc, yesFunc }: GameOverPopupProps) => (
  <Modal animationType="slide" transparent>
    <View style={PopupStyleSheet.centeredView}>
      <View style={PopupStyleSheet.containerView}>
        <View style={PopupStyleSheet.imageContainerView}>
          <ImageBackground source={confetti} style={PopupStyleSheet.confettiView}>
            <ImageBackground source={balloons} style={PopupStyleSheet.balloonView}>
              <ImageOption state={outcomeVar} />
            </ImageBackground>
          </ImageBackground>
        </View>
        <View style={PopupStyleSheet.buttonContainer}>
          <Pressable style={PopupStyleSheet.modalButton} onPress={noFunc}>
            <Text style={AppStylesheet.buttonText}>Rematch</Text>
          </Pressable>
          <Pressable
            style={[PopupStyleSheet.modalButton, { backgroundColor: "#dbedf9" }]}
            onPress={yesFunc}
          >
            <Text style={AppStylesheet.buttonText}>Return Home</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);

export default GameOverPopup;

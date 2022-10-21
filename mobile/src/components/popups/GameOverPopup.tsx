import { useNavigation } from "@react-navigation/native";
import { Modal, Text, Pressable, View, ImageBackground, Image } from "react-native";

import balloons from "../../../assets/balloon_background.png";
import stars from "../../../assets/draw_background.png";
import loseMascot from "../../../assets/mascot.png";
import drawMascot1 from "../../../assets/mascot_stemett.png";
import winMascot from "../../../assets/mascot_waving.png";
import { AppStylesheet } from "../../styles/AppStylesheet";
import { PopupStyleSheet } from "../../styles/PopupStylesheet";

// Pass in as props the button's label text, and what the button does when no and yes are pressed
const GameOverPopup = ({ outcomeVar }) => {
  const navigation = useNavigation();
  const gameOverMessages = {
    win: "Great Work, You Win!",
    loss: "Good Effort, Try Again!",
    draw: "It's a Draw!",
  };
  const mascots = {
    win: [winMascot],
    loss: [loseMascot],
    draw: [drawMascot1, loseMascot],
  };
  return (
    <Modal animationType="slide" transparent>
      <View style={PopupStyleSheet.centeredViewDim}>
        <View style={PopupStyleSheet.containerView}>
          <View style={PopupStyleSheet.imageContainerView}>
            <ImageBackground
              source={outcomeVar === "draw" ? stars : balloons}
              style={PopupStyleSheet.balloonView}
            >
              <View style={PopupStyleSheet.imageRow}>
                {mascots[outcomeVar].map((mas) => (
                  <Image key={mas} source={mas} style={PopupStyleSheet.mascotView} />
                ))}
              </View>
              <Text style={PopupStyleSheet.gameOverText}>{gameOverMessages[outcomeVar]}</Text>
            </ImageBackground>
          </View>
          <View style={PopupStyleSheet.buttonContainer}>
            <Pressable
              style={PopupStyleSheet.modalButton}
              onPress={() => {
                /* TODO */
              }}
            >
              <Text style={AppStylesheet.buttonText}>Rematch</Text>
            </Pressable>
            <Pressable
              style={[PopupStyleSheet.modalButton, { backgroundColor: "#dbedf9" }]}
              onPress={() => navigation.navigate("HomeScreen")}
            >
              <Text style={AppStylesheet.buttonText}>Return Home</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GameOverPopup;

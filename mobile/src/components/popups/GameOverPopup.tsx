import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Modal, Text, Pressable, View, ImageBackground, Image } from "react-native";

import balloons from "../../../assets/backgrounds/balloon_background.png";
import stars from "../../../assets/backgrounds/draw_background.png";
import loseMascot from "../../../assets/mascots/mascot.png";
import drawMascot1 from "../../../assets/mascots/mascot_stemett.png";
import winMascot from "../../../assets/mascots/mascot_waving.png";
import { SocketContext } from "../../contexts/SocketContext";
import { AppStylesheet } from "../../styles/AppStylesheet";
import { PopupStyleSheet } from "../../styles/PopupStylesheet";

// Pass in as props the button's label text, and what the button does when no and yes are pressed
const GameOverPopup = ({ outcome }) => {
  const socket = useContext(SocketContext);
  const navigation = useNavigation();
  const messages = {
    win: "Great Work, You Win!",
    loss: "Good Effort, Try Again!",
    draw: "It's a Draw!",
    disconnect: "Oops, Your Opponent Disconnected!",
    stalemate: "Stalemate, It's a Draw!",
    resign: "Your Opponent Resigned, You Win!",
  };
  const mascots = {
    win: [winMascot],
    loss: [loseMascot],
    draw: [drawMascot1, loseMascot],
    disconnect: [winMascot],
    stalemate: [drawMascot1, loseMascot],
    resign: [winMascot],
  };
  const backgrounds = {
    win: balloons,
    loss: balloons,
    draw: stars,
    disconnect: balloons,
    stalemate: stars,
    resign: balloons,
  };
  const [wantRematch, setWantRematch] = useState(false);

  return (
    <Modal animationType="slide" transparent>
      <View style={[PopupStyleSheet.centeredView, { backgroundColor: "rgba(0, 0, 0, 0.25)" }]}>
        <View style={PopupStyleSheet.containerView}>
          <View style={PopupStyleSheet.imageContainerView}>
            <ImageBackground source={backgrounds[outcome]} style={PopupStyleSheet.balloonView}>
              <View style={PopupStyleSheet.imageRow}>
                {mascots[outcome].map((mas) => (
                  <Image key={mas} source={mas} style={PopupStyleSheet.mascotView} />
                ))}
              </View>
              <Text style={PopupStyleSheet.gameOverText}>{messages[outcome]}</Text>
            </ImageBackground>
          </View>
          <View style={PopupStyleSheet.buttonContainer}>
            <Pressable
              style={[PopupStyleSheet.modalButton, wantRematch ? AppStylesheet.grayButton : {}]}
              onPress={() => {
                if (!wantRematch) {
                  socket.emit("rematch");
                  setWantRematch(true);
                }
              }}
            >
              <Text style={AppStylesheet.buttonText}>{wantRematch ? "Waiting..." : "Rematch"}</Text>
            </Pressable>
            <Pressable
              style={[PopupStyleSheet.modalButton, { backgroundColor: "#dbedf9" }]}
              onPress={() => {
                socket.emit("no rematch");
                navigation.navigate("HomeScreen");
              }}
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

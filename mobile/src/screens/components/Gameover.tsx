import React, { useState } from "react";
import { View, StyleSheet, Text, Modal, Alert, Pressable } from "react-native";

const popUpStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  exitButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  reviewButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
  },
});

export default function Gameover({ isGameOver, playerWhoWon }) {
  // If white's turn, black has just went and game is over due to blackr
  const gameOverMessages = {
    w: "Black has won",
    b: "White has won",
  };
  // When gameover, display a popup to notify the players
  if (isGameOver) {
    const [modalVisible, setModalVisible] = useState(true);
    return (
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={popUpStyles.centeredView}>
          <View style={popUpStyles.modalView}>
            <Text style={popUpStyles.modalText}>{gameOverMessages[playerWhoWon]}</Text>
            <Pressable
              style={[popUpStyles.exitButton, popUpStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={popUpStyles.textStyle}>Exit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }
  return null;
}

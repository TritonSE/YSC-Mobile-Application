import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Text, Modal, Alert, Pressable } from "react-native";

export default function Gameover({isGameOver, playerWhoWon}) {
    // Dictionary storing display messages
    var gameOverMessages = {
        'b': "Black has won",
        'w': "White has won"
    };
    // Initializes modalVisible as false when game is not over
    console.log(isGameOver);
    console.log(playerWhoWon);
    // When gameover, display a popup to notify the players
    if (isGameOver) {
        const [modalVisible, setModalVisible] = useState(true);
        return (
        <Modal
            animationType="slide"
            transparent={true}
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
                    <Pressable
                        style={[popUpStyles.reviewButton, popUpStyles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={popUpStyles.textStyle}>Review</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
        );
    }
    return null;
}

const popUpStyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
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
        height: 2
      },
      shadowOpacity: 0.50,
      shadowRadius: 10,
      elevation: 5
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
      textAlign: "center"
    },
    modalText: {
      marginBottom: 10,
      textAlign: "center"
    }
  });
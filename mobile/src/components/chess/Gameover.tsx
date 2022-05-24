import React, { useContext } from "react";
import { View } from "react-native";

import { SocketContext } from "../../contexts/SocketContext";
import TwoButtonPopup from "../popups/TwoButtonPopup";

// const popUpStyles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   exitButton: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   reviewButton: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//     marginTop: 20,
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   modalText: {
//     marginBottom: 10,
//     textAlign: "center",
//   },
// });

const Gameover = ({ isGameOver, playerWhoWon }) => {
  console.log(playerWhoWon);
  const socket = useContext(SocketContext);

  const quitGame = () => {
    socket.emit("game over");
  };

  const rematchGame = () => {
    socket.emit("rematch");
  };
  // When gameover, display a popup to notify the players
  return (
    <View>
      {isGameOver && (
        <TwoButtonPopup labelText="Rematch?" noFunc={quitGame} yesFunc={rematchGame} />
      )}
    </View>
  );
};

export default Gameover;

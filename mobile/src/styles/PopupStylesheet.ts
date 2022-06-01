import { StyleSheet } from "react-native";

export const PopupStyleSheet = StyleSheet.create({
  containerView: {
    justifyContent: "center",
    alignItems: "center",
    width: 337,
    height: 425,
    borderWidth: 5,
    backgroundColor: "white",
    borderColor: "#96C957",
  },
  imageContainerView: {
    justifyContent: "center",
    alignItems: "center",
  },
  confettiView: {
    width: 327,
    height: 337,
  },
  balloonView: {
    width: 327,
    height: 326,
    alignItems: "center",
  },
  mascotView: {
    width: 140,
    height: 236,
    marginTop: 90,
    justifyContent: "center",
  },
  gameOverText: {
    position: "absolute",
    backgroundColor: "white",
    flex: 1,
    fontSize: 24,
    marginTop: 62,
    fontStyle: "normal",
    fontWeight: "700",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  enumView: {
    flex: 1,
    alignItems: "center",
  },

  modalView: {
    backgroundColor: "white",
    width: 337,
    height: 171,
  },

  modalText: {
    marginTop: 26,
    fontSize: 18,
    textAlign: "center",
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },

  modalButton: {
    backgroundColor: "#96C957",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    width: 89,
    height: 52,
    marginTop: 20,
  },
});

import { StyleSheet } from "react-native";

export const AppStylesheet = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  button: {
    backgroundColor: "#96C957",
    width: 327,
    height: 52,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  buttonText: {
    position: "absolute",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "normal",
  },

  forgotPassword: {
    width: 114,
    height: 18,
    marginTop: 20,
  },

  forgotPasswordText: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 15,
    textAlign: "left",
    textDecorationLine: "underline",
  },

  input: {
    padding: 10,
  },

  mascot: {
    width: 375,
    height: 375,
  },

  textInputField: {
    fontSize: 16,
    padding: 5,
    fontStyle: "normal",
    fontWeight: "normal",
    borderRadius: 3,
    width: 327,
    height: 37,
    borderWidth: 1,
    borderColor: "#000000",
    alignContent: "center",
  },

  textInputHeader: {
    color: "#000000",
    fontStyle: "normal",
    fontSize: 16,
    fontWeight: "700",
  },

  forgotPasswordImage: {
    width: 234,
    height: 395,
  },

  headerHomeScreen: {
    top: 6,
    left: 8,
    fontSize: 32,
    fontWeight: "700",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
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

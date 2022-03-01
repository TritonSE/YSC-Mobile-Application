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
});

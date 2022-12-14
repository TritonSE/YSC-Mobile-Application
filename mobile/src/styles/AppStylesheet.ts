import { StyleSheet } from "react-native";

export const AppStylesheet = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#7FCC26",
    width: 327,
    height: 52,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  grayButton: {
    width: 90,
    backgroundColor: "#8E8E8E",
  },
  buttonText: {
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    fontFamily: "Roboto",
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
    textAlign: "center",
    textDecorationLine: "underline",
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
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
    fontFamily: "RobotoBold",
  },
  textInputError: {
    borderColor: "#EF1234",
  },
  textHeaderError: {
    color: "#EF1234",
  },
  forgotPasswordImage: {
    width: 234,
    height: 395,
  },
  headerHomeScreen: {
    position: "absolute",
    top: "5%",
    left: 8,
    fontSize: 32,
    marginTop: 16,
    marginLeft: 16,
    fontWeight: "700",
    fontFamily: "Lato",
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
    fontFamily: "Roboto",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButton: {
    backgroundColor: "#7FCC26",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    width: 89,
    height: 52,
    marginTop: 20,
  },
  stemmettImage: {
    height: "55%",
  },

  lessonView: {
    backgroundColor: "#7FCC26",
    marginHorizontal: 10,
    width: 100,
    height: 60,
  },
  lessonViewIncomplete: {
    backgroundColor: "#DBEDF9",
  },

  lessonProgressOuter: {
    backgroundColor: "#DBEDF9",
    height: 30,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
    marginTop: 30,
  },
  lessonProgressInner: {
    backgroundColor: "#7FCC26",
    width: 100,
    height: 30,
    borderRadius: 10,
    overflow: "hidden",
  },

  lessonText: {
    top: 15,
    textAlign: "center",
  },

  lessonSubContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  lessonContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  lessonHeader: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  lessonHeaderText: {
    fontSize: 20,
    fontFamily: "Roboto",
  },

  starImage: {
    flex: 1,
    justifyContent: "center",
    textAlign: "left",
    position: "relative",
    top: 12,
    left: 5,
  },

  loginError: {
    flex: 1,
    width: "100%",
    minHeight: "5%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "10%",
    backgroundColor: "#FF5555",
    fontFamily: "Roboto",
  },

  studentSelectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    marginBottom: 10,
  },
  studentSelectionContainer: {
    width: "90%",
    height: "75%",
    borderRadius: 10,
    backgroundColor: "#96C9574F",
    marginBottom: 10,
  },
  studentSelectionRow: {
    height: 70,
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  studentSelectionColumn: {
    flex: 1,
  },
  studentSelectionBack: {
    width: "20%",
  },
  headerStyleSheetText: {
    position: "absolute",
    top: "8%",
    fontSize: 28,
    fontWeight: "700",
  },
  usernameHeader: {
    fontWeight: "700",
    fontSize: 18,
  },
  searchFlex: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "90%",
  },
  searchInput: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    width: "35%",
    height: 30,
    borderRadius: 5,
    padding: 3,
    marginBottom: "3%",
  },
});

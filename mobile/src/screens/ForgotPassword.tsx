import React from "react";
import { StyleSheet, Text, View, Image, Pressable, TextInput, SafeAreaView } from "react-native";



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
    },
  
    TextHeader: {
      color: "#000000",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 16,
      // alignContent: 'left',
    },
  
    characterImage: {
      width: 234,
      height: 395,
    },
  
    textInputField: {
      fontSize: 16,
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "normal",
      // position: 'absolute',
      borderRadius: 3,
      // background: '#FFFFFF',
      width: 327,
      height: 37,
      // top: 19,
      // bottom: 3,
      borderWidth: 1,
      borderColor: "#000000",
      alignContent: "center",
      left: "0%",
      right: "0%",
      top: "33.93%",
    },
  
    // same code from LoginInScreen.jsx
    ResetPasswordButton: {
      backgroundColor: "#96C957",
      width: 327,
      height: 52,
      borderRadius: 3,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      // flex: 1,
      // order: 0,
      // flexGrow: 0,
    },
  
    // reusing same code from LoginInScreen.jsx
    ResetPasswordButtonText: {
      position: "absolute",
      fontSize: 18,
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "normal",
      lineHeight: 21,
      /* identical to box height */
  
      // textAlign: 'center',
      // textTransform: 'capitalize'
    },
  });

  
  
function ForgotPassword() {
  const [currentPasswordText, changedCurrentPasswordText] = React.useState("Example Padding");
  const [newPasswordText, changednewPasswordText] = React.useState("Example Padding");
  const [confirmPasswordText, changedConfirmPasswordText] = React.useState("Example Padding");

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.characterImage}
          source={require("../../assets/forgotPasswordScreenImage.png")}
        />
      </View>

      <Text style={styles.TextHeader}>Current Password</Text>

      {/* used same code from loginscreen 2.jsx screen */}
      <SafeAreaView>
        <TextInput
          style={styles.textInputField}
          onChangeText={changedCurrentPasswordText}
          value={currentPasswordText}
        />
      </SafeAreaView>

      {/* <br>
        </br> */}

      <Text style={styles.TextHeader}>New Password</Text>

      {/* used same code from loginscreen 2.jsx screen */}
      <SafeAreaView>
        <TextInput
          style={styles.textInputField}
          onChangeText={changednewPasswordText}
          value={newPasswordText}
        />
      </SafeAreaView>

      {/* <br>
        </br> */}

      <Text style={styles.TextHeader}>Confirm New Password</Text>

      {/* used same code from loginscreen 2.jsx screen */}
      <SafeAreaView>
        <TextInput
          style={styles.textInputField}
          onChangeText={changedConfirmPasswordText}
          value={confirmPasswordText}
        />
      </SafeAreaView>

      {/* same code from LoginInScreen.jsx */}
      <Pressable style={styles.ResetPasswordButton}>
        <Text style={styles.ResetPasswordButtonText}>Reset Password</Text>
      </Pressable>
    </View>
  );
}

export default ForgotPassword;
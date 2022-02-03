
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

import stemettImg from "../../assets/Stemett.png";

import { RootStackParamList } from "./RootStackParams";

type logInScreenProp = StackNavigationProp<RootStackParamList, "Login page">;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  Stemett: {
    width: 156,
    height: 369,
  },

  ForgotPassword: {
    width: 114,
    height: 18,
    marginTop: 20,
  },

  ForgotPasswordText: {
    // fontFamily: fontFinal,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 15,
    lineHeight: 18,
    /* identical to box height */

    textAlign: "center",
    textDecorationLine: "underline",
  },

  LogInScreenButton: {
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

  LogInScreenButtonText: {
    position: "absolute",
    fontSize: 18,
    // fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: 21,
    /* identical to box height */

    // textAlign: 'center',
    // textTransform: 'capitalize'
  },
});

function LogInScreen() {
  
  const navigation = useNavigation<logInScreenProp>();

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.Stemett} source={stemettImg} />
      </View>

      <View>
        <Pressable
          style={styles.LogInScreenButton}
          onPress={() => navigation.navigate("Login page 2")}
        >
          <Text style={styles.LogInScreenButtonText}>Login</Text>
        </Pressable>

        <Pressable
          style={styles.ForgotPassword}
          onPress={() => navigation.navigate("forgot password screen")}
        >
          <Text style={styles.ForgotPasswordText}>Forgot Password</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default LogInScreen;

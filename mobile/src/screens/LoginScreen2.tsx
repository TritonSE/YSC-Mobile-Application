import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, View, Image, Pressable, TextInput, SafeAreaView } from "react-native";
import mascotImg from "../../assets/STEMy_Mascot.png";
import {AppStylesheet} from '../styles/AppStylesheet'
import { RootStackParamList } from "./RootStackParams";




type logIn2ScreenProp = StackNavigationProp<RootStackParamList, "Login page 2">;

function LoginScreen2() {
  const navigation = useNavigation<logIn2ScreenProp>();
  const [usernameText, changedUsernameText] = React.useState("Example Padding");
  const [passwordText, changedPasswordText] = React.useState("Example Padding");

  return (
    <View style={AppStylesheet.container}>
      <View>
        <Image style={AppStylesheet.STEMy_Mascot} source={mascotImg} />
      </View>

      <View style = {AppStylesheet.input}>
      <Text style={AppStylesheet.textInputHeader}>Username</Text>
      {/* username text input field */}
      <SafeAreaView>
        <TextInput
          style={AppStylesheet.textInputField}
          onChangeText={changedUsernameText}
          value={usernameText}
        />
      </SafeAreaView>
      </View>

      <View style = {AppStylesheet.input}>
      <Text style={AppStylesheet.textInputHeader}>Password</Text>
      {/* password text input field */}
      <SafeAreaView>
        <TextInput
          style={AppStylesheet.textInputField}
          onChangeText={changedPasswordText}
          value={passwordText} 
        />
      </SafeAreaView>
      </View>

      {/* reusing same code from LoginScreen.jsx */}
      <View>
        <Pressable style={AppStylesheet.button}>
          <Text style={AppStylesheet.buttonText}>Login</Text>
        </Pressable>
      </View>

      {/* same code from LoginInScreen.jsx */}
      <Pressable
        style={AppStylesheet.ForgotPassword}
        onPress={() => navigation.navigate("forgot password screen")}
      >
        <Text style={AppStylesheet.ForgotPasswordText}>Forgot Password</Text>
      </Pressable>
    </View>
  );
}

export default LoginScreen2;

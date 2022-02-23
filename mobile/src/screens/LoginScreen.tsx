import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, Image, Pressable, TextInput, SafeAreaView } from "react-native";

import mascotImg from "../../assets/STEMy_Mascot.png";
import Button from "../components/Button";
import { AppStylesheet } from "../styles/AppStylesheet";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [usernameText, changedUsernameText] = useState("Example Padding");
  const [passwordText, changedPasswordText] = useState("Example Padding");

  return (
    <View style={AppStylesheet.container}>
      <View>
        <Image style={AppStylesheet.stemyMascot} source={mascotImg} />
      </View>

      <View style={AppStylesheet.input}>
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

      <View style={AppStylesheet.input}>
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

      <Button text="Login" />

      <Pressable
        style={AppStylesheet.forgotPassword}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={AppStylesheet.forgotPasswordText}>Forgot Password</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

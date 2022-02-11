import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";

import React from "react";

import { Text, View, Image, Pressable } from "react-native";

import {AppStylesheet} from '../styles/AppStylesheet'

import stemettImg from "../../assets/Stemett.png";

import { RootStackParamList } from "./RootStackParams";




type logInScreenProp = StackNavigationProp<RootStackParamList, "Login page">;

function LogInScreen() {
  const navigation = useNavigation<logInScreenProp>();

  return (
    <View style={AppStylesheet.container}>
      <View>
        <Image style={AppStylesheet.Stemett} source={stemettImg} />
      </View>

      <View>
        <Pressable
          style={AppStylesheet.button}
          onPress={() => navigation.navigate("Login page 2")}
        >
          <Text style={AppStylesheet.buttonText}>Login</Text>
        </Pressable>

        <Pressable
          style={AppStylesheet.ForgotPassword}
          onPress={() => navigation.navigate("forgot password screen")}
        >
          <Text style={AppStylesheet.ForgotPasswordText}>Forgot Password</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default LogInScreen;

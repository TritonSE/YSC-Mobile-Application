import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import mascotImg from "../../assets/mascot.png";
import Button from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";
import { SocketContext } from "../contexts/SocketContext";
import { AppStylesheet } from "../styles/AppStylesheet";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  // testing
  const socket = useContext(SocketContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(username, password);
  };

  // testing purposes only
  socket.on("connect", () => {
    console.log("user connected");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, height: "100%" }}
    >
      <View style={AppStylesheet.container}>
        <View>
          <Image style={AppStylesheet.mascot} source={mascotImg} />
        </View>

        <View style={AppStylesheet.input}>
          <Text style={AppStylesheet.textInputHeader}>Username</Text>
          {/* username text input field */}
          <SafeAreaView>
            <TextInput
              style={AppStylesheet.textInputField}
              onChangeText={setUsername}
              value={username}
            />
          </SafeAreaView>
        </View>

        <View style={AppStylesheet.input}>
          <Text style={AppStylesheet.textInputHeader}>Password</Text>
          {/* password text input field */}
          <SafeAreaView>
            <TextInput
              secureTextEntry
              style={AppStylesheet.textInputField}
              onChangeText={setPassword}
              value={password}
            />
          </SafeAreaView>
        </View>

        <Button text="Login" onPress={handleLogin} />

        <Pressable
          style={AppStylesheet.forgotPassword}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={AppStylesheet.forgotPasswordText}>Forgot Password</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

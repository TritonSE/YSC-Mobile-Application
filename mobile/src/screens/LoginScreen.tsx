import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { useState, useContext, useEffect } from "react";
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
import { SOCKET_URI } from "react-native-dotenv";
import { io } from "socket.io-client";

import mascotImg from "../../assets/mascot.png";
import Button from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";
import { AppStylesheet } from "../styles/AppStylesheet";

const socket = io(SOCKET_URI, {
  transports: ["websocket"],
});

const sendToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  socket.emit("validate", token);
  console.log("sending token from login screen...");
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login, setIsLoggedIn } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("user connected");
    });

    socket.on("disconnect", (reason) => {
      console.log("user disconnected");
      if (reason === "io server disconnect") {
        // if disconnection was initiated by the server, need to reconnect manually
        // TODO: if invalid token, any frontend feedback? in what cases would user have invalid token, is frontend feedback necessary?
        // what are other cases of manual server disconnection? do we want same behavior below?

        setIsLoggedIn(false); // redirect user to login screen if invalid token
      }
    });
  }, [socket]);

  const handleLogin = () => {
    login(username, password);
    sendToken();
  };

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

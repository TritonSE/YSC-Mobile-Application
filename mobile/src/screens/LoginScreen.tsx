import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";

import mascotImg from "../../assets/mascot.png";
import Button from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";
import { AppStylesheet } from "../styles/AppStylesheet";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [error, setError] = useState();

  const handleLogin = async () => {
    let err = false;
    setUsernameErr(false);
    setPasswordErr(false);
    setError();
    if (username.trim() === "") {
      err = true;
      setUsernameErr(true);
    }
    if (password.trim() === "") {
      err = true;
      setPasswordErr(true);
    }

    if (err) return;

    setError(await login(username, password));
  };

  return (
    <View style={AppStylesheet.container}>
      <ScrollView style={{ flex: 1, height: "100%" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, height: "100%" }}
        >
          <View style={[AppStylesheet.container, { paddingTop: "20%" }]}>
            <View>
              <Image style={AppStylesheet.mascot} source={mascotImg} />
            </View>

            <View style={AppStylesheet.input}>
              <Text
                style={[
                  AppStylesheet.textInputHeader,
                  usernameErr ? AppStylesheet.textHeaderError : {},
                ]}
              >
                Username
              </Text>
              {/* username text input field */}
              <TextInput
                style={[
                  AppStylesheet.textInputField,
                  usernameErr ? AppStylesheet.textInputError : {},
                ]}
                onChangeText={setUsername}
                value={username}
              />
            </View>

            <View style={AppStylesheet.input}>
              <Text
                style={[
                  AppStylesheet.textInputHeader,
                  passwordErr ? AppStylesheet.textHeaderError : {},
                ]}
              >
                Password
              </Text>
              {/* password text input field */}
              <TextInput
                secureTextEntry
                style={[
                  AppStylesheet.textInputField,
                  passwordErr ? AppStylesheet.textInputError : {},
                ]}
                onChangeText={setPassword}
                value={password}
              />
            </View>

            <Button text="Login" onPress={handleLogin} />

            <Pressable
              style={AppStylesheet.forgotPassword}
              onPress={() => navigation.navigate("Forgot Password")}
            >
              <Text style={AppStylesheet.forgotPasswordText}>Forgot Password</Text>
            </Pressable>

            <View style={[AppStylesheet.loginError, { opacity: 0 + !!error }]}>
              <Text>{error}</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

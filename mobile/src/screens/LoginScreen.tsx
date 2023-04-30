import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext, useRef } from "react";
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

import mascotImg from "../../assets/mascots/mascot.png";
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
  const [waiting, setWaiting] = useState(false);

  const passwordRef = useRef();

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

    setWaiting(true);
    setError(await login(username, password, () => setWaiting(false)));
  };

  return (
    <View style={AppStylesheet.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, height: "100%" }}
      >
        <ScrollView style={{ flex: 1, height: "100%" }}>
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
              <TextInput
                style={[
                  AppStylesheet.textInputField,
                  usernameErr ? AppStylesheet.textInputError : {},
                ]}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
                blurOnSubmit={false}
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
              <TextInput
                ref={passwordRef}
                secureTextEntry
                style={[
                  AppStylesheet.textInputField,
                  passwordErr ? AppStylesheet.textInputError : {},
                ]}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                onChangeText={setPassword}
                value={password}
              />
            </View>

            <Button
              text={waiting ? "Loading..." : "Login"}
              onPress={handleLogin}
              style={waiting ? { opacity: 0.5 } : {}}
            />

            <Pressable
              style={AppStylesheet.forgotPassword}
              onPress={() => navigation.navigate("Forgot Password")}
            >
              <Text style={AppStylesheet.forgotPasswordText}>Forgot Password</Text>
            </Pressable>

            <View style={[AppStylesheet.loginError, { opacity: 0 + !!error }]}>
              <Text style={{ fontFamily: "Roboto" }}>{error}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

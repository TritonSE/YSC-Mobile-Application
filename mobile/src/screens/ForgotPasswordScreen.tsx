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

import img from "../../assets/mascot_waving.png";
import Button from "../components/Button";
import OneButtonPopup from "../components/popups/OneButtonPopup";
import { AuthContext } from "../contexts/AuthContext";
import { AppStylesheet } from "../styles/AppStylesheet";

// https://github.com/manishsaraan/email-validator
const tester =
  /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const validate_email = (email) => {
  if (!email) return false;

  const emailParts = email.split("@");

  if (emailParts.length !== 2) return false;

  const account = emailParts[0];
  const address = emailParts[1];

  if (account.length > 64) return false;
  if (address.length > 255) return false;

  const domainParts = address.split(".");
  if (domainParts.some((part) => part.length > 63)) {
    return false;
  }

  return tester.test(email);
};

const ForgotPassword = () => {
  const navigation = useNavigation();
  const { resetPassword } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const handlePress = async () => {
    let err = false;
    setUsernameErr(false);
    setEmailErr(false);
    setError();
    if (username.trim() === "") {
      err = true;
      setUsernameErr(true);
    }
    if (email.trim() === "" || !validate_email(email)) {
      err = true;
      setEmailErr(true);
    }

    if (err) return;

    const res = await resetPassword(username, email);
    setError(res);
    if (!res) setSuccess(true);
  };

  return (
    <>
      {success && (
        <OneButtonPopup
          labelText="Password reset email sent! Please check your inbox for instructions."
          buttonText="Return to Login"
          buttonFunc={() => navigation.navigate("Login")}
          popupStyle={{ height: 200 }}
        />
      )}

      <View style={AppStylesheet.container}>
        <ScrollView style={{ flex: 1, height: "100%" }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, height: "100%" }}
          >
            <View style={[AppStylesheet.container, { paddingTop: "20%" }]}>
              <View>
                <Image style={AppStylesheet.forgotPasswordImage} source={img} />
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
                  onChangeText={setUsername}
                  value={username}
                />
              </View>

              <View style={AppStylesheet.input}>
                <Text
                  style={[
                    AppStylesheet.textInputHeader,
                    emailErr ? AppStylesheet.textHeaderError : {},
                  ]}
                >
                  Email
                </Text>
                <TextInput
                  style={[
                    AppStylesheet.textInputField,
                    emailErr ? AppStylesheet.textInputError : {},
                  ]}
                  onChangeText={setEmail}
                  value={email}
                />
              </View>

              <Button text="Reset Password" onPress={handlePress} />

              <Pressable
                style={AppStylesheet.forgotPassword}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={AppStylesheet.forgotPasswordText}>Back</Text>
              </Pressable>

              <View style={[AppStylesheet.loginError, { opacity: 0 + !!error }]}>
                <Text>{error}</Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </>
  );
};

export default ForgotPassword;

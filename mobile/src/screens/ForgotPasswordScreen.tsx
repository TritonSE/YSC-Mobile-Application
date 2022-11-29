import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, Image, TextInput, SafeAreaView, Pressable } from "react-native";

import img from "../../assets/mascot_waving.png";
import Button from "../components/Button";
import { AppStylesheet } from "../styles/AppStylesheet";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("Example Padding");

  return (
    <View style={AppStylesheet.container}>
      <View>
        <Image style={AppStylesheet.forgotPasswordImage} source={img} />
      </View>

      <View style={AppStylesheet.input}>
        <Text style={AppStylesheet.textInputHeader}>User Email</Text>

        <SafeAreaView>
          <TextInput style={AppStylesheet.textInputField} onChangeText={setEmail} value={email} />
        </SafeAreaView>
      </View>

      <Button text="Reset Password" />

      <Pressable style={AppStylesheet.forgotPassword} onPress={() => navigation.navigate("Login")}>
        <Text style={AppStylesheet.forgotPasswordText}>Back</Text>
      </Pressable>
    </View>
  );
};

export default ForgotPassword;

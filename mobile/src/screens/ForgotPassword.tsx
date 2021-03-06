import React, { useState } from "react";
import { Text, View, Image, TextInput, SafeAreaView } from "react-native";

import img from "../../assets/mascot_waving.png";
import Button from "../components/Button";
import { AppStylesheet } from "../styles/AppStylesheet";

const ForgotPassword = () => {
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
    </View>
  );
};

export default ForgotPassword;

import React, { useState } from "react";
import { Text, View, Image, TextInput, SafeAreaView } from "react-native";

import img from "../../assets/forgotPasswordScreenImage.png";
import Button from "../components/Button";
import {AppStylesheet} from '../styles/AppStylesheet'

const ForgotPassword = () => {
  const [currentEmailText, changedUserEmailText] = useState("Example Padding");

  return (
    <View style={AppStylesheet.container}>
      <View>
        <Image style={AppStylesheet.forgotPasswordImage} source={img} />
      </View>

      <View style = {AppStylesheet.input}>
      <Text style={AppStylesheet.textInputHeader}>User Email</Text>

      {/* used same code from loginscreen 2.jsx screen */}
      <SafeAreaView>
        <TextInput
          style={AppStylesheet.textInputField}
          onChangeText={changedUserEmailText}
          value={currentEmailText}
        />
      </SafeAreaView>
      </View>

      {/* <br>
        </br> */}

      <Button text="Reset Password"/>
    </View>
  );
}

export default ForgotPassword;

import React from "react";
import { Text, View, Image, Pressable, TextInput, SafeAreaView } from "react-native";
import {AppStylesheet} from '../styles/AppStylesheet'
import img from "../../assets/forgotPasswordScreenImage.png";

const ForgotPassword = () => {
  const [currentEmailText, changedUserEmailText] = React.useState("Example Padding");

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

      <Pressable style={AppStylesheet.button}>
        <Text style={AppStylesheet.buttonText}>Reset Password</Text>
      </Pressable>
    </View>
  );
}

export default ForgotPassword;

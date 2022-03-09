import React from "react";
import { Text, View, Pressable } from "react-native";

import { AppStylesheet } from "../styles/AppStylesheet";

type ButtonProps = {
  text: string;
  onPress?: any;
};

const Button = ({ text, onPress = undefined }: ButtonProps) => (
  <View>
    <Pressable style={AppStylesheet.button} onPress={onPress}>
      <Text style={AppStylesheet.buttonText}>{text}</Text>
    </Pressable>
  </View>
);

export default Button;

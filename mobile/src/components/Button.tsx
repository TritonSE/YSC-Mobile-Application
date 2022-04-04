import React from "react";
import { Text, View, Pressable, GestureResponderEvent } from "react-native";

import { AppStylesheet } from "../styles/AppStylesheet";

type ButtonProps = {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const Button = ({ text, onPress }: ButtonProps) => (
  <View>
    <Pressable style={AppStylesheet.button} onPress={onPress}>
      <Text style={AppStylesheet.buttonText}>{text}</Text>
    </Pressable>
  </View>
);
Button.defaultProps = {
  onPress: undefined,
};

export default Button;

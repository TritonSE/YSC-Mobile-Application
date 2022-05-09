import React from "react";
import { Text, View, Pressable, GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

import { AppStylesheet } from "../styles/AppStylesheet";

interface ButtonProps {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  style: StyleProp<ViewStyle>;
}

const Button = ({ text, onPress, style }: ButtonProps) => (
  <View>
    <Pressable style={[AppStylesheet.button, style]} onPress={onPress}>
      <Text style={AppStylesheet.buttonText}>{text}</Text>
    </Pressable>
  </View>
);
Button.defaultProps = {
  onPress: undefined,
};

export default Button;

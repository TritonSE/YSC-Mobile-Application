import React, { ReactElement, ReactFragment } from "react";
import { Text, View, Pressable, GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

import { AppStylesheet } from "../styles/AppStylesheet";

interface ButtonProps {
  text: string;
  image?: ReactFragment;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

const Button = ({ text, image, onPress, style }: ButtonProps) => (
  <View>
    <Pressable style={[AppStylesheet.button, style]} onPress={onPress}>
      {image}
      <Text style={AppStylesheet.buttonText}>{text}</Text>
    </Pressable>
  </View>
);
Button.defaultProps = {
  onPress: undefined,
  style: undefined,
  image: undefined
};

export default Button;

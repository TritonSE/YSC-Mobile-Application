import React from "react";
import { Text, View, Pressable } from "react-native";

import { AppStylesheet } from "../styles/AppStylesheet";

type ButtonProps = {
  text: string;
  onPress?: any;
}

const Button = (props: ButtonProps) => (
  <View>
    <Pressable style={AppStylesheet.button} onPress={props.onPress}>
      <Text style={AppStylesheet.buttonText}>{props.text}</Text>
    </Pressable>
  </View>
);

export default Button;

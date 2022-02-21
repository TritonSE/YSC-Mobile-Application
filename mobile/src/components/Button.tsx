import React from "react";
import { Text, View, Pressable} from "react-native";

import {AppStylesheet} from '../styles/AppStylesheet'

const Button = (prop: {text: string}) => (
   <View>
     <Pressable style={AppStylesheet.button}>
       <Text style={AppStylesheet.buttonText}>{prop.text}</Text>
     </Pressable>
   </View>
 );

 export default Button;
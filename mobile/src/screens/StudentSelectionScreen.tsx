import React from "react";
import { Text, View } from "react-native";

import { AppStylesheet } from "../styles/AppStylesheet";

const StudentSelectionScreen = () => {

  return (
    <View style={AppStylesheet.container}>
        <Text>3 Students Online</Text>

        <View style={[AppStylesheet.studentSelectionContainer, {flexDirection: "row"}]}>
          <View style={{ flex: 1, backgroundColor: "#96C957" }} />
          <View style={{ flex: 1, backgroundColor: "#96C957" }} />
          <View style={{ flex: 1, backgroundColor: "#96C957" }} />
        </View>
    
    </View>
  );
};
export default StudentSelectionScreen;

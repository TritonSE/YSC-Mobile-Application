import React from "react";
import { Text, View } from "react-native";

import { AppStylesheet } from "../styles/AppStylesheet";

const StudentSelectionScreen = () => {

  return (
    <View style={AppStylesheet.container}>
        <Text>3 Students Online</Text>

        {/* student selection layout */}
        <View style={[AppStylesheet.studentSelectionContainer, {flexDirection: "column"}]}>
          <View style={{ flex: 1, backgroundColor: "#96C957" }} />
          <View style={{ flex: 1, backgroundColor: "#000000" }} />
          <View style={{ flex: 1, backgroundColor: "#96C957" }} />
        </View>
    
    </View>
  );
};
export default StudentSelectionScreen;

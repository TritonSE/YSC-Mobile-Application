import React from "react";
import { Text, View } from "react-native";

import { AppStylesheet } from "../styles/AppStylesheet";

const StudentSelectionScreen = () => {

  return (
    <View style={AppStylesheet.container}>
        <Text style={AppStylesheet.headerStyleSheetText}>3 Students Online</Text>

        {/* student selection layout */}
        <View style={[AppStylesheet.studentSelectionContainer, {flexDirection: "column"}]}>
          <View style={{ flex: 1, backgroundColor: "#96C957" }}>
            <Text syle = {AppStylesheet.usernameHeader}>Username</Text>
            <Text>User</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#96C9574F" }}>
            <Text>Username</Text>
            <Text>User</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#96C957" }}>
            <Text>Username</Text>
            <Text>User</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#96C9574F" }}>
            <Text>Username</Text>
            <Text>User</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#96C957" }}>
            <Text>Username</Text>
            <Text>User</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#96C9574F" }}> 
            <Text>Username</Text>
            <Text>User</Text>
          </View>
        </View>
    
    </View>
  );
};
export default StudentSelectionScreen;

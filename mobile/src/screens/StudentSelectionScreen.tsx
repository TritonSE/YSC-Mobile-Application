import React from "react";
import { Text, View, Pressable } from "react-native";

import { AppStylesheet } from "../styles/AppStylesheet";

const StudentSelectionScreen = () => (
  <View style={AppStylesheet.container}>
    <Text style={AppStylesheet.headerStyleSheetText}>3 Students Online</Text>

    {/* student selection layout */}
    <View style={[AppStylesheet.studentSelectionContainer, { flexDirection: "column" }]}>
      <View style={[AppStylesheet.studentSelectionRow, { backgroundColor: "#96C9577F" }]}>
        <View style={AppStylesheet.studentSelectionColumn}>
          <Text style={AppStylesheet.usernameHeader}>Username</Text>
          <Text>User</Text>
        </View>
        <View>
          <Pressable style={AppStylesheet.studentSelectionButton}>
            <Text style={{ fontSize: 18 }}>Play</Text>
          </Pressable>
        </View>
      </View>
      <View style={AppStylesheet.studentSelectionRow}>
        <View style={AppStylesheet.studentSelectionColumn}>
          <Text style={AppStylesheet.usernameHeader}>Username</Text>
          <Text>User</Text>
        </View>
        <View>
          <Pressable style={AppStylesheet.studentSelectionButton}>
            <Text style={{ fontSize: 18 }}>Play</Text>
          </Pressable>
        </View>
      </View>
      <View style={[AppStylesheet.studentSelectionRow, { backgroundColor: "#96C9577F" }]}>
        <View style={AppStylesheet.studentSelectionColumn}>
          <Text style={AppStylesheet.usernameHeader}>Username</Text>
          <Text>User</Text>
        </View>
        <View>
          <Pressable style={AppStylesheet.studentSelectionButton}>
            <Text style={{ fontSize: 18 }}>Play</Text>
          </Pressable>
        </View>
      </View>
      <View style={AppStylesheet.studentSelectionRow}>
        <View style={AppStylesheet.studentSelectionColumn}>
          <Text style={AppStylesheet.usernameHeader}>Username</Text>
          <Text>User</Text>
        </View>
        <View>
          <Pressable style={AppStylesheet.studentSelectionButton}>
            <Text style={{ fontSize: 18 }}>Play</Text>
          </Pressable>
        </View>
      </View>
      <View style={[AppStylesheet.studentSelectionRow, { backgroundColor: "#96C9577F" }]}>
        <View style={AppStylesheet.studentSelectionColumn}>
          <Text style={AppStylesheet.usernameHeader}>Username</Text>
          <Text>User</Text>
        </View>
        <View>
          <Pressable style={AppStylesheet.studentSelectionButton}>
            <Text style={{ fontSize: 18 }}>Play</Text>
          </Pressable>
        </View>
      </View>
      <View style={AppStylesheet.studentSelectionRow}>
        <View style={AppStylesheet.studentSelectionColumn}>
          <Text style={AppStylesheet.usernameHeader}>Username</Text>
          <Text>User</Text>
        </View>
        <View>
          <Pressable style={AppStylesheet.studentSelectionButton}>
            <Text style={{ fontSize: 18 }}>Play</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </View>
);
export default StudentSelectionScreen;

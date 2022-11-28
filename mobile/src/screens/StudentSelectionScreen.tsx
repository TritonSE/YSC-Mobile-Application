import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, Image, Pressable, SafeAreaView, TextInput } from "react-native";

import BackArrow from "../../assets/back_Arrow.png";
import GreenDot from "../../assets/green_Dot_Selection_Screen.png";
import SearchIcon from "../../assets/searchIcon.png";
import { AppStylesheet } from "../styles/AppStylesheet";

const StudentSelectionScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  return (
    <View style={AppStylesheet.container}>
      <View style={AppStylesheet.studentSelectionBack}>
        <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: "row" }}>
          <Image style={{ marginRight: "2%" }} source={BackArrow} />
          <Text> Back </Text>
        </Pressable>
      </View>

      <Text style={{ fontWeight: "bold", margin: "5%" }}>
        3 Students Online <Image style={{ marginRight: "2%" }} source={GreenDot} />{" "}
      </Text>

      <SafeAreaView style={AppStylesheet.searchInput}>
        <Image style={{ marginRight: "2%" }} source={SearchIcon} />
        <TextInput
          onChangeText={setSearch}
          value={search}
          placeholder="Search"
          placeholderTextColor="#000"
        />
      </SafeAreaView>

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
};
export default StudentSelectionScreen;

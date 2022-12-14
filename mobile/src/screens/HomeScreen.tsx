import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Text, View, Image } from "react-native";

import PlayIcon from "../../assets/icons/play.png";
import Button from "../components/Button";
import PlayersOnline from "../components/PlayersOnline";
import { UserContext } from "../contexts/UserContext";
import { AppStylesheet } from "../styles/AppStylesheet";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userState } = useContext(UserContext);

  return (
    <View style={AppStylesheet.container}>
      <Text style={AppStylesheet.headerHomeScreen}>Welcome, {userState.firstName.trim()}!</Text>
      <View>
        {userState.role === "student" ? (
          <>
            <Button
              text="Play Game With A Mentor"
              image={<Image style={{ marginRight: "2%" }} source={PlayIcon} />}
              onPress={() => navigation.navigate("SelectionScreen", { role: "mentor" })}
              style={{ flexDirection: "row", alignItems: "center" }}
            />
            <Button
              text="Play Game With A Student"
              image={<Image style={{ marginRight: "2%" }} source={PlayIcon} />}
              onPress={() => navigation.navigate("SelectionScreen", { role: "student" })}
              style={{ flexDirection: "row", alignItems: "center", marginBottom: "2%" }}
            />
          </>
        ) : (
          <Button
            text="Play Game"
            image={<Image style={{ marginRight: "2%" }} source={PlayIcon} />}
            onPress={() => navigation.navigate("SelectionScreen")}
            style={{ flexDirection: "row", alignItems: "center", marginBottom: "2%" }}
          />
        )}
      </View>
      <PlayersOnline />
    </View>
  );
};

export default HomeScreen;

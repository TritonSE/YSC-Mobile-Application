import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Text, View, Image } from "react-native";

import PlayIcon from "../../assets/play-icon.png";
// import LessonsBottomNavigation from "../../assets/LessonsBottomNavigation.png";
// import ChessBottomNavigation from "../../assets/ChessBottomNav.png";
import Button from "../components/Button";
import PlayersOnline from "../components/PlayersOnline";
import { SocketContext } from "../contexts/SocketContext";
import { UserContext } from "../contexts/UserContext";
import { AppStylesheet } from "../styles/AppStylesheet";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import LessonsPageScreen from "./LessonsPageScreen";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userState } = useContext(UserContext);
  const socket = useContext(SocketContext);

  const moveToLoading = () => {
    socket.emit("assign to room");
    navigation.navigate("LoadingScreen");
  };

  return (
    <View style={AppStylesheet.container}>
      <Text style={AppStylesheet.headerHomeScreen}>Welcome, {userState.firstName}</Text>
      <View>
        {userState.role === "student" && (
          <Button
            text="Play Game With A Mentor"
            image={<Image style={{ marginRight: "2%" }} source={PlayIcon} />}
            onPress={moveToLoading}
            style={{ flexDirection: "row", alignItems: "center" }}
          />
        )}
        <Button
          text="Play Game With A Student"
          image={<Image style={{ marginRight: "2%" }} source={PlayIcon} />}
          onPress={moveToLoading}
          style={{ flexDirection: "row", alignItems: "center" }}
        />
      </View>
      <PlayersOnline />
    </View>
  );
};

// const bottomNavigator = createBottomTabNavigator();

// const BottomNav = () =>  {
//   return (
//     <bottomNavigator.Navigator>
//       <bottomNavigator.Screen name="Home" component={HomeScreenHelper}
//       options={{
//         tabBarIcon: () => (
//           <Image source={ChessBottomNavigation} />) }} />
//       <bottomNavigator.Screen name="Lessons" component={LessonsPageScreen}
//       options={{
//         tabBarIcon: () => (
//           <Image source={LessonsBottomNavigation} />) }}/>
//     </bottomNavigator.Navigator>
//   );
// }

// const HomeScreen = () =>  {
//   return (
//     <NavigationContainer independent={true}>
//       <BottomNav />
//     </NavigationContainer>
//   );
// }

export default HomeScreen;

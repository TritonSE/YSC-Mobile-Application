import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import { Image } from "react-native";

import ChessBottomNavigation from "../../assets/ChessBottomNav.png";
import LessonsBottomNavigation from "../../assets/LessonsBottomNavigation.png";
import { AuthContext } from "../contexts/AuthContext";
import Chess from "../screens/Chess";
import ForgotPassword from "../screens/ForgotPassword";
import HomeScreen from "../screens/HomeScreen";
import LessonsPageScreen from "../screens/LessonsPageScreen";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";

type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  HomeScreen: undefined;
  LoadingScreen: undefined;
  Chess: { color: string; players: string[] };
};

const screenOptions = {
  headerShown: false,
  gestureEnabled: false,
  tabBarActiveBackgroundColor: "#96C957",
  tabBarInactiveBackgroundColor: "#EDEDED",
};

function HomeScreenStack() {
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="LoadingScreen" component={LoadingScreen} />
      <HomeStack.Screen name="Chess" component={Chess} />
    </HomeStack.Navigator>
  );
}

function LessonsPageScreenStack() {
  const LessonsStack = createNativeStackNavigator();

  return (
    <LessonsStack.Navigator screenOptions={screenOptions}>
      <LessonsStack.Screen name="LessonsScreen" component={LessonsPageScreen} />
    </LessonsStack.Navigator>
  );
}

function MainScreen() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreenStack}
        options={{ tabBarIcon: () => <Image source={ChessBottomNavigation} /> }}
      />
      <Tab.Screen
        name="Lessons"
        component={LessonsPageScreenStack}
        options={{ tabBarIcon: () => <Image source={LessonsBottomNavigation} /> }}
      />
    </Tab.Navigator>
  );
}

const Navigator = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation();

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("Main");
    }
  }, [isLoggedIn]);

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Main" component={MainScreen} />
    </Stack.Navigator>
  );

  // return (
  //   <Tab.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
  //     {isLoggedIn ? (
  //         <>
  //         </>
  //       ) : (
  //         null
  //         <>
  //         <Stack.Screen name="Login" component={LoginScreen} />
  //         <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  //         </>
  //       )}
  //   </Tab.Navigator>
  // <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
  //   {isLoggedIn ? (
  //     <>
  //       <Stack.Screen name="HomeScreen" component={HomeScreen} />
  //       <Stack.Screen
  //         name="LoadingScreen"
  //         component={LoadingScreen}
  //         options={{ gestureEnabled: false }}
  //       />
  //       <Stack.Screen name="Chess" component={Chess} options={{ gestureEnabled: false }} />
  //     </>
  //   ) : (
  //     <>
  //       <Stack.Screen name="Login" component={LoginScreen} />
  //       <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  //     </>
  //   )}
  // </Stack.Navigator>
  // );
};

export default Navigator;

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import { Image } from "react-native";

import HomeIcon from "../../assets/tab_home.png";
import LessonsIcon from "../../assets/tab_lessons.png";
import { AuthContext } from "../contexts/AuthContext";
import Chess from "../screens/Chess";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import LessonsScreen from "../screens/LessonsScreen";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";
import SelectionScreen from "../screens/SelectionScreen";

import InviteDialogs from "./InviteDialogs";

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const LessonsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="SelectionScreen" component={SelectionScreen} />
    <HomeStack.Screen
      name="LoadingScreen"
      component={LoadingScreen}
      options={{ gestureEnabled: false }}
    />
    <HomeStack.Screen name="Chess" component={Chess} options={{ gestureEnabled: false }} />
  </HomeStack.Navigator>
);

const LessonsStackScreen = () => (
  <LessonsStack.Navigator screenOptions={{ headerShown: false }}>
    <LessonsStack.Screen name="LessonsScreen" component={LessonsScreen} />
  </LessonsStack.Navigator>
);

const TabScreen = () => (
  <>
    <InviteDialogs />
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        /* eslint-disable react/no-unstable-nested-components */
        tabBarIcon: ({ size }) => (
          <Image
            style={{ width: size, height: size }}
            source={route.name === "Home" ? HomeIcon : LessonsIcon}
          />
        ),
        /* eslint-enable react/no-unstable-nested-components */
        tabBarActiveBackgroundColor: "#96C957",
        tabBarActiveTintColor: "black",
        tabBarInactiveBackgroundColor: "#EDEDED",
        tabBarInactiveTintColor: "black",
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Lessons" component={LessonsStackScreen} />
    </Tab.Navigator>
  </>
);

const Navigator = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("Main");
    }
  }, [isLoggedIn]);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
      <Stack.Screen name="Main" component={TabScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;

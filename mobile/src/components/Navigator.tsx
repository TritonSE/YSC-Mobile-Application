import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import { Image } from "react-native";

import HomeIcon from "../../assets/tab_home.png";
import LessonsIcon from "../../assets/tab_lessons.png";
import { AuthContext } from "../contexts/AuthContext";
import Chess from "../screens/Chess";
// import ForgotPassword from "../screens/ForgotPassword";
import HomeScreen from "../screens/HomeScreen";
import LessonsScreen from "../screens/LessonsScreen";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";

type RootStackParamList = {
  Login: undefined;
  // ForgotPassword: undefined;
  HomeScreen: undefined;
  LoadingScreen: undefined;
  Chess: { color: string; players: string[] };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = createNativeStackNavigator();
const LessonsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const stackOptions = {
  headerShown: false,
  gestureEnabled: false,
};

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={stackOptions}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="LoadingScreen" component={LoadingScreen} options={stackOptions} />
    <HomeStack.Screen name="Chess" component={Chess} options={stackOptions} />
  </HomeStack.Navigator>
);

const LessonsStackScreen = () => (
  <LessonsStack.Navigator screenOptions={stackOptions}>
    <LessonsStack.Screen name="LessonsScreen" component={LessonsScreen} />
  </LessonsStack.Navigator>
);

const HomeTabIcon = ({ size }) => <Image style={{ width: size, height: size }} source={HomeIcon} />;
const LessonsTabIcon = ({ size }) => (
  <Image style={{ width: size, height: size }} source={LessonsIcon} />
);

const TabScreen = () => (
  <Tab.Navigator
    screenOptions={{
      ...stackOptions,
      tabBarActiveBackgroundColor: "#96C957",
      tabBarActiveTintColor: "black",
      tabBarInactiveBackgroundColor: "#EDEDED",
      tabBarInactiveTintColor: "black",
    }}
  >
    <Tab.Screen name="Home" component={HomeStackScreen} options={{ tabBarIcon: HomeTabIcon }} />
    <Tab.Screen
      name="Lessons"
      component={LessonsStackScreen}
      options={{ tabBarIcon: LessonsTabIcon }}
    />
  </Tab.Navigator>
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
    <Stack.Navigator initialRouteName="Login" screenOptions={stackOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={TabScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;

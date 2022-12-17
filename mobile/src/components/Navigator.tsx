import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useContext, useEffect } from "react";
import { AppState, Image } from "react-native";

import HomeIcon from "../../assets/icons/tab_home.png";
import LessonsIcon from "../../assets/icons/tab_lessons.png";
import { AuthContext } from "../contexts/AuthContext";
import { SocketContext } from "../contexts/SocketContext";
import { UserContext } from "../contexts/UserContext";
import ChessScreen from "../screens/ChessScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import LessonHomeScreen from "../screens/LessonHomeScreen";
import LessonScreen from "../screens/LessonScreen";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";
import SelectionScreen from "../screens/SelectionScreen";

import InviteDialogs from "./InviteDialogs";
import OneButtonPopup from "./popups/OneButtonPopup";

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
    <HomeStack.Screen
      name="ChessScreen"
      component={ChessScreen}
      options={{ gestureEnabled: false }}
    />
  </HomeStack.Navigator>
);

const LessonsStackScreen = () => (
  <LessonsStack.Navigator screenOptions={{ headerShown: false }}>
    <LessonsStack.Screen name="LessonHomeScreen" component={LessonHomeScreen} />
    <LessonsStack.Screen name="LessonScreen" component={LessonScreen} />
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
        tabBarLabelStyle: {
          fontFamily: "Roboto",
        },
        tabBarActiveBackgroundColor: "#7FCC26",
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
  const navigation = useNavigation();
  const { isLoggedIn } = useContext(AuthContext);
  const { userState } = useContext(UserContext);
  const socket = useContext(SocketContext);

  const [dialog, setDialog] = useState(false);
  const [oldState, setOldState] = useState("active");

  useEffect(() => {
    let int;
    if (isLoggedIn) {
      /* TODO: This doesn't work */
      int = setInterval(() => {
        if (!socket.connected) {
          socket.connect();
          socket.emit("successful login", userState.username, userState.role);
          setDialog(true);
        }
      }, 10000);
      AppState.addEventListener("change", (newState) => {
        if (newState === "active" && (oldState === "background" || oldState === "inactive")) {
          socket.disconnect();
          socket.connect();
          socket.emit("successful login", userState.username, userState.role);
        }
        setOldState(newState);
      });
      navigation.navigate("Main");
    }

    return () => {
      if (int) clearInterval(int);
    };
  }, [isLoggedIn]);

  return (
    <>
      {dialog && (
        <OneButtonPopup
          labelText="Oops! Lost connection to server, please retry."
          buttonText="Retry"
          buttonFunc={() => setDialog(false)}
        />
      )}

      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
        <Stack.Screen name="Main" component={TabScreen} />
      </Stack.Navigator>
    </>
  );
};

export default Navigator;

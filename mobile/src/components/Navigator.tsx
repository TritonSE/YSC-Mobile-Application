import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";
import Chess from "../screens/Chess";
import ForgotPassword from "../screens/ForgotPassword";
import HomeScreen from "../screens/HomeScreen";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LessonsPageScreen from "../screens/LessonsPageScreen";

type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  HomeScreen: undefined;
  LoadingScreen: undefined;
  Chess: { color: string; players: string[] };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = createNativeStackNavigator();

function HomeScreenStack()
{
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="LoadingScreen" component={LoadingScreen} />
      <HomeStack.Screen name="Chess" component={Chess} />
    </HomeStack.Navigator>
  );
}

const LessonsStack = createNativeStackNavigator();
function LessonsPageScreenStack()
{
  return (
    <LessonsStack.Navigator>
      <LessonsStack.Screen name="Lessons" component={LessonsPageScreen} />
    </LessonsStack.Navigator>
  );
}


const Navigator = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
    <Tab.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
          <>
          <Tab.Screen name="Home" component={HomeScreenStack} />
          <Tab.Screen name="Lessons" component={LessonsPageScreenStack} />
          </>
        ) : (
          <>
          <Stack.Screen name="Login" component={LoginScreen} /> 
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        )}
    </Tab.Navigator>
    </NavigationContainer>

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
  );
};

export default Navigator;

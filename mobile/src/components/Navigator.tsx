import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";
import Chess from "../screens/Chess";
import ForgotPassword from "../screens/ForgotPassword";
import HomeScreen from "../screens/HomeScreen";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="Chess" component={Chess} options={{ gestureEnabled: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigator;

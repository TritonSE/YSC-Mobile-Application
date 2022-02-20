import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import ForgotPassword from "./src/screens/ForgotPassword";
import LoginScreen2 from "./src/screens/LoginScreen2";
import SplashScreen from "./src/screens/SplashScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash Screen">
        <Stack.Screen
          name="Splash Screen 2"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login page 2"
          component={LoginScreen2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="forgot password screen"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

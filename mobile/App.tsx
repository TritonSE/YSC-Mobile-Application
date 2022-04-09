import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Chess from "./src/screens/Chess";
import ForgotPassword from "./src/screens/ForgotPassword";
import LoginScreen from "./src/screens/LoginScreen";

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Chess" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Chess" component={Chess} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

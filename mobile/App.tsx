import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import ForgotPassword from "./src/screens/ForgotPassword";
import LoginScreen from "./src/screens/LoginScreen";

import {SocketContext, socket} from './src/contexts/SocketContext';

const Stack = createNativeStackNavigator();

const App = () => (
  <SocketContext.Provider value={socket}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  </SocketContext.Provider>
);

export default App;

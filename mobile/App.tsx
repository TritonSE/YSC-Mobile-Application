import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";

import { AuthContext, AuthProvider } from "./src/contexts/AuthContext";
import ForgotPassword from "./src/screens/ForgotPassword";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  React.useEffect(() => {
    console.log("isLoggedIn in app: ", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            </>
          )}
          {/* <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

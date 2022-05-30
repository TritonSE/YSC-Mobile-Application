import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import React, { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";
import Chess from "../screens/Chess";
import ForgotPassword from "../screens/ForgotPassword";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

const validateTokenOnLoad = async () => {
  const navigation = useNavigation();
  const { validate } = useContext(AuthContext);
  let userToken;

  try {
    /* eslint-disable no-unused-vars */
    userToken = await SecureStore.getItemAsync("token"); // retrieve token
  } catch (err) {
    // Restoring token failed
    navigation.navigate("LoginScreen");
  }

  // validate token if it exists to check for expiry
  const validToken = validate();

  // if token is valid & not expired, navigate to home screen
  if (validToken) navigation.navigate("HomeScreen");
};

const Navigator = () => {
  const { isLoggedIn } = useContext(AuthContext);

  React.useEffect(() => {
    validateTokenOnLoad();
  }, []);

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Chess" component={Chess} />
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

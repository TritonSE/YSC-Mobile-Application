import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, {useContext} from "react";

import ForgotPassword from "./src/screens/ForgotPassword";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";

import { AuthContext, AuthProvider } from "./src/contexts/AuthContext";
const Stack = createNativeStackNavigator();

const App = () => {
  const { validate } = useContext(AuthContext);
  let isLoggedIn = validate();
  React.useEffect(() => {
    isLoggedIn = validate();

  }, [])


  return (
  <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}> 
      
      { isLoggedIn ?
      (
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      ): 
      (
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
  )
};

export default App;

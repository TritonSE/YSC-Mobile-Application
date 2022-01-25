import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import LogInScreen from "./src/screens/LogInScreen";
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen2 from "./src/screens/LoginScreen2";
import ForgotPassword from "./src/screens/ForgotPassword";

import { RootStackParamList } from "./src/screens/RootStackParams";
// export type RootStackParamList = {
//   "Splash Screen": undefined;
//   Login: undefined;
//   "Login page 2": undefined;
//   "forgot password screen": undefined;
// };

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList {
//   "Splash Screen": undefined;
//   Login: undefined;
//   "Login page 2": undefined;
//   "forgot password screen": undefined;
//     }
//   }
// }

const Stack = createNativeStackNavigator();
// const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash Screen">
        <Stack.Screen
          name="Splash Screen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login page" component={LogInScreen} options={{ headerShown: false }} />
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { Lato_700Bold } from "@expo-google-fonts/lato";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";

import Navigator from "./src/components/Navigator";
import { AuthProvider } from "./src/contexts/AuthContext";
import { SocketProvider } from "./src/contexts/SocketContext";
import { UserProvider } from "./src/contexts/UserContext";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto: Roboto_400Regular,
    RobotoBold: Roboto_700Bold,
    Lato: Lato_700Bold,
  });

  const onReady = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SocketProvider>
      <UserProvider>
        <AuthProvider>
          <NavigationContainer onReady={onReady}>
            <Navigator />
          </NavigationContainer>
        </AuthProvider>
      </UserProvider>
    </SocketProvider>
  );
};

export default App;

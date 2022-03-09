import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/contexts/UserContext";
import { AuthProvider } from "./src/contexts/AuthContext";
import Navigator from "./src/components/Navigator";

const App = () => {
  return (
    <UserProvider>
      <AuthProvider>
        <NavigationContainer>
          <Navigator/>
        </NavigationContainer>
      </AuthProvider>
    </UserProvider>
  );
};

export default App;

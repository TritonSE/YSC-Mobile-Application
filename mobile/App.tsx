import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import Navigator from "./src/components/Navigator";
import { AuthProvider } from "./src/contexts/AuthContext";
import { UserProvider } from "./src/contexts/UserContext";

const App = () => (
  <UserProvider>
    <AuthProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </AuthProvider>
  </UserProvider>
);

export default App;

import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import Navigator from "./src/components/Navigator";
import { AuthProvider } from "./src/contexts/AuthContext";
import { SocketProvider } from "./src/contexts/SocketContext";
import { UserProvider } from "./src/contexts/UserContext";

const App = () => (
  <SocketProvider>
    <UserProvider>
      <AuthProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </AuthProvider>
    </UserProvider>
  </SocketProvider>
);

export default App;
